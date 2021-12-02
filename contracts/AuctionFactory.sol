// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './interfaces/IAuctionFactory.sol';
import './TutorAuction.sol';

contract AuctionFactory is IAuctionFactory {
    using SafeMath for uint256;
 
    address[] public allTutors;       //모든 선생님
    address[] public startedTutors;   //경매 진행 중
    address[] public stoppedTutors;   //경매 진행 중X

    uint256[] public rates;

    struct Tutor {
        TutorAuction auction;       //경매 컨트랙트 
        uint256 averageRate;        //평가(100점 만점)
        uint256 pay;                //시급 * 10
        uint256 index;
        bool isRegistered;          //가입 여부
        string education;           //학력
        string career;              //경력
    }

    mapping(address => Tutor) public tutors;

    modifier whenCallerIsRegistered {
        require(tutors[msg.sender].isRegistered, "You are not registerd.");
        _;
    }

    function registerTutor(
        string memory _education,     //학력
        string memory _career,        //경력
        uint256 _pay                  //시급 * 10 (소수점 처리)
    ) external {
        require(tutors[msg.sender].isRegistered == false , "You already did.");
        require(pay != 0, "Please submit your pay.");
        //Tutor 등록(+경매 컨트랙트 생성)
        uint256 index = allTutors.length;
        tutors[msg.sender] = Tutor(
            new TutorAuction(),
            0,
            _pay,
            index,
            true,
            _education,
            _career
        );
        allTutors.push(msg.sender);
        stoppedTutors.push(msg.sender);

        emit TutorRegistered(msg.sender);
    }

    //프로필 정보 수정
    function editProfile(
        string memory _education,     //학력
        string memory _career,        //경력
        uint256 _pay                   //시급 * 10 (소수점 처리)
    ) external {
        require(tutors[msg.sender].isRegistered, "You did not register.");
        require(pay != 0, "Please submit your pay.");

        tutors[msg.sender].education = _education;
        tutors[msg.sender].career = _career;
        tutors[msg.sender].pay = _pay;

        emit ProfileEdited(msg.sender);
    }

    function startAuction(
        uint _endPrice,     //경매 종료 가격
        uint _endTime       //경매 지속 시간
    )external whenCallerIsRegistered {
        require(tutors[msg.sender].auction.inProgress() == false, "You are already in progress.");
        require(tutors[msg.sender].auction.totalBid() == 0, "Auction did not reset yet.");
        require(_endPrice >= 0.01 ether && _endPrice <= 1 ether, "Enter between 0.01 ether and 1 ether.");
        require(_endTime >= 1 weeks && _endTime <= 12 weeks, "Enter between 1 week and 12 weeks.");

        tutors[msg.sender].auction.startAuction(_endPrice, _endTime);

        //TODO 배열 조작 필요
        emit AuctionStarted(msg.sender, _endPrice, _endTime);
    }

    //아무도 입찰하지 않았을 때 중단 가능
    function abortAuction() external whenCallerIsRegistered {
        require(tutors[msg.sender].auction.inProgress() == true, "You did not start.");
        uint256 totalBidding = tutors[msg.sender].auction.totalBid();
        require(totalBidding == 0, "There is bidding.");

        tutors[msg.sender].auction.endAuction();

        //TODO 배열 조작 필요

        emit AuctionAborted(msg.sender);
    }

    //경매 종료 및 평가 종료 후 평가 반영, 보상 출금
    function claimReward() external whenCallerIsRegistered {
        require(tutors[msg.sender].auction.inProgress() == false, "Auction is in progress.");
        require(tutors[msg.sender].auction.totalBid() != 0, "Auction already reset.");

        //평가 기록
        rates.push(tutors[msg.sender].auction.rate());
        //평균 평가 계산
        uint sum = 0;
        uint len = rates.length;
        for (uint i = 0; i < len; i++) {
            sum = sum.add(rates[i]);
        }
        tutors[msg.sender].averageRate = sum.div(len);
        //보상 지급 및 최종 리셋
        tutors[msg.sender].auction.claimReward(msg.sender);
    }
}