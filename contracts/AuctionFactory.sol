// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './interfaces/IAuctionFactory.sol';
import './TutorAuction.sol';

contract AuctionFactory is IAuctionFactory {
    using SafeMath for uint256;
 
    address[] public allTutors;       //모든 선생님

    Tutor[] public resultArray;

    struct Tutor {
        TutorAuction auction;       //경매 컨트랙트 
        address tutor;
        uint256 averageRate;        //평가(100점 만점)
        uint256 pay;                //시급 * 10
        uint256 index;
        bool isRegistered;          //가입 여부
        string education;           //학력
        string career;              //경력
        string description;         //소개
        bool inProgress;            //경매 진행 여부
    }

    mapping(address => Tutor) public tutors;

    modifier whenCallerIsRegistered {
        require(tutors[msg.sender].isRegistered, "You are not registerd.");
        _;
    }

    function getAllTutorArray() external returns (Tutor[] memory) {
        delete resultArray;
        for (uint256 i = 0; i < allTutors.length; i++) {
            resultArray.push(tutors[allTutors[i]]);
        }
        return resultArray;
    }

    function getStartedTutorArray() external returns (Tutor[] memory) {
        delete resultArray;
        for (uint256 i = 0; i < allTutors.length; i++) {
            if(tutors[allTutors[i]].inProgress){
                resultArray.push(tutors[allTutors[i]]);
            }
        }
        return resultArray;
    }

    function getStoppedTutorArray() external returns (Tutor[] memory) {
        delete resultArray;
        for (uint256 i = 0; i < allTutors.length; i++) {
            if(!tutors[allTutors[i]].inProgress){
                resultArray.push(tutors[allTutors[i]]);
            }
        }
        return resultArray;
    }

    function registerTutor(
        string memory _education,     //학력
        string memory _career,        //경력
        string memory _description,   //소개
        uint256 _pay                  //시급 * 10 (소수점 처리)
    ) external {
        require(tutors[msg.sender].isRegistered == false , "You already did.");
        require(_pay != 0, "Please submit your pay.");
        //Tutor 등록(+경매 컨트랙트 생성)
        uint256 index = allTutors.length;
        tutors[msg.sender] = Tutor(
            new TutorAuction(msg.sender),
            msg.sender,
            0,
            _pay,
            index,
            true,
            _education,
            _career,
            _description,
            false
        );
        allTutors.push(msg.sender);

        emit TutorRegistered(msg.sender, _education, _career, _description, _pay);
    }

    //프로필 정보 수정
    function editProfile(
        string memory _education,      //학력
        string memory _career,         //경력
        string memory _description,    //소개
        uint256 _pay                   //시급 * 10 (소수점 처리)
    ) external whenCallerIsRegistered {
        require(_pay != 0, "Please submit your pay.");

        tutors[msg.sender].education = _education;
        tutors[msg.sender].career = _career;
        tutors[msg.sender].description = _description;
        tutors[msg.sender].pay = _pay;

        emit ProfileEdited(msg.sender, _education, _career, _description, _pay);
    }

    function startAuction(
        uint256 _endPrice,     //경매 종료 가격
        uint256 _endTime       //경매 지속 시간
    )external whenCallerIsRegistered {
        require(tutors[msg.sender].inProgress == false, "You are already in progress.");
        require(tutors[msg.sender].auction.totalBid() == 0, "Auction did not reset yet.");
        require(_endPrice >= 0.01 ether && _endPrice <= 1 ether, "Enter between 0.01 ether and 1 ether.");
        require(_endTime >= 1 weeks && _endTime <= 12 weeks, "Enter between 1 week and 12 weeks.");

        tutors[msg.sender].inProgress = true;
        tutors[msg.sender].auction.startAuction(_endPrice, _endTime);

        emit AuctionStarted(msg.sender, _endPrice, _endTime);
    }

    //아무도 입찰하지 않았을 때 중단 가능
    function abortAuction() external whenCallerIsRegistered {
        TutorAuction auction = tutors[msg.sender].auction;
        require(tutors[msg.sender].inProgress == true, "You did not start.");
        require(auction.totalBid() == 0, "There is bidding.");

        tutors[msg.sender].inProgress = false;
        auction.endAuction();

        emit AuctionAborted(msg.sender);
    }

    //경매 종료 및 평가 종료 후 평가 반영, 보상 출금
    function claimReward() external whenCallerIsRegistered {
        TutorAuction auction = tutors[msg.sender].auction;
        require(auction.inProgress() == false, "Auction is in progress.");
        require(auction.totalBid() != 0, "Auction already reset.");

        //평균 평가 계산
        tutors[msg.sender].averageRate = auction._calAverageRate();
        //보상 지급 및 최종 리셋
        auction.claimReward(msg.sender);

        emit RewardClaimed(msg.sender, tutors[msg.sender].averageRate, address(auction).balance);
    }

    function _endAuction(address _tutor) external {
        require(msg.sender == address(tutors[_tutor].auction), "Only auction contract can call this.");

        tutors[_tutor].inProgress = false;
    }
}