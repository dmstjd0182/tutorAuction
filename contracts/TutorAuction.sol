// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/ITutorAuction.sol';
import './interfaces/IAuctionFactory.sol';

contract TutorAuction is ITutorAuction, Ownable{
    using SafeMath for uint256;

    //평가 기록
    uint256[] public rates;
    //종료 가격: 0.01 ether ~ 1 ether
    uint256 public endPrice; 
    //경매 시작 시간
    uint256 public startedTime;
    //경매 지속 시간: 1주 ~ 12주
    uint256 public endTime;
    //경매 종료 후 보상 청구 가능한 시간
    uint256 public rewardPendingUntil;
    //경매 종료 후 평가(100점 만점, 평가 안 남기면 Tutor가 모두 가져감.)
    uint256 public rate = 100;
    //총 입찰(wei)
    uint256 public totalBid;
    //최고 입찰가
    uint256 public highestBid;
    //최고 입찰자
    address public highestBidder;
    //경매 진행 중: 기본값 false
    bool public inProgress = false;    
    //선생님 주소
    address public tutor;

    mapping(address => uint256) public pendingBid;     //최고 입찰자 제외

    constructor(address _tutor) {
        endPrice = 0;
        endTime = 0;
        inProgress = false;
        tutor = _tutor;
    }

    function startAuction(uint _endPrice, uint _endTime) external onlyOwner {
        endPrice = _endPrice;
        endTime = _endTime;
        startedTime = block.timestamp;
        inProgress = true;
    }

    //Tutor가 abort하거나 종료시간이 다 되었을 때
    function endAuction() external {
        require(block.timestamp > startedTime.add(endTime) || msg.sender == owner());
        
        _endAuction();
    }

    function bid() external payable {
        require(inProgress, "Auction is not in progress.");
        require(msg.value > highestBid, "Bid should be larger than highest bid.");

        //경매 시간 종료
        if(block.timestamp > startedTime.add(endTime)) {
            revert AuctionTimeOver();
        }

        //기존 최고 입찰자 -> Pending
        pendingBid[highestBidder] = highestBid;
        //기존 최고 입찰자에게 입찰가 반환
        _withdraw(highestBidder);

        highestBid = msg.value;
        highestBidder = msg.sender;

        totalBid = totalBid.add(msg.value);

        //종료 가격 -> 경매 종료
        if(highestBid >= endPrice) {
            _endAuction();
        }
        emit Bid(msg.sender, msg.value);
    }

    //경매 종료 후 보상 청구 가능 시간 전까지 낙찰자가 평가 남기기
    function setRate(uint256 _rate) external{
        require(inProgress == false, "Auction did not end.");
        require(msg.sender == highestBidder, "You are not highest bidder.");
        require(_rate >= 0 && _rate <= 100, "Rate between 0 ~ 100");
        require(block.timestamp < rewardPendingUntil, "Rating time over.");
        
        rate = _rate;

        uint256 biddershare = address(this).balance.mul(100 - rate).div(100);

        //다시 평가 못하게 낙찰자 리셋
        highestBidder = address(0);

        payable(highestBidder).transfer(biddershare);

        emit RateSet(highestBidder, rate, biddershare);
    }

    //최종 보상 청구
    function claimReward(address _tutor) external onlyOwner {
        require(block.timestamp > rewardPendingUntil, "Reward is pending yet.");

        //경매 최종 리셋
        rate = 100;
        rewardPendingUntil = 0;
        highestBid = 0;
        totalBid = 0;

        //이 컨트랙트 잔고 모두 지급
        payable(_tutor).transfer(address(this).balance);
    }

    function _withdraw(address overbid) private {
        uint256 amount = pendingBid[overbid];

        pendingBid[overbid] = 0;
        totalBid = totalBid.sub(amount);

        if(payable(msg.sender).send(amount)){       //보안 문제로 send 사용
            emit Withdraw(overbid, amount);
        }else {
            totalBid = totalBid.add(amount);
        } //악의적인 공격 시 공격자 입찰만 없애고 tutor의 몫은 남김
    }

    function _endAuction() private {
        endPrice = 0;
        startedTime = 0;
        endTime = 0;
        inProgress = false;

        IAuctionFactory factory = IAuctionFactory(owner());
        factory._endAuction(tutor);

        if(totalBid != 0) {
        //(Abort 아니라면) 경매 종료 시점 일주일 후부터 보상 청구 가능
        rewardPendingUntil = block.timestamp + 1 weeks;
        }
        emit AuctionEnded(highestBidder, highestBid, rewardPendingUntil);
    }

    function _calAverageRate() external onlyOwner returns (uint256) {

        //평가 기록
        rates.push(rate);
        //평균 평가 계산
        uint sum = 0;
        uint len = rates.length;
        for (uint i = 0; i < len; i++) {
            sum = sum.add(rates[i]);
        }
        uint256 averageRate = sum.div(len);

        return averageRate;
    }
}