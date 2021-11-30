// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './interfaces/IAuctionFactory.sol';
import './TutorAuction.sol';

contract AuctionFactory is IAuctionFactory {
    using SafeMath for uint256;
    //경매 컨트랙트 주소
    address private AUCTION_IMPLEMENT_ADDRESS;

    
    address[] public allTutors;       //모든 선생님
    address[] public startedTutors;   //경매 진행 중
    address[] public stoppedTutors;   //경매 진행 중X

    struct Tutor {
        TutorAuction auction;       //경매 컨트랙트 
        uint256 rate;               //평가(100점 만점)
        uint256 index;
        bool inProgress;            //경매 진행중
        bool isRegistered;          //가입 여부
        string education;           //학력
        string career;              //경력
    }

    mapping(address => Tutor) public tutors;

    function registerTutor(
        string memory _education,     //학력
        string memory _career,        //경력
        uint256 pay                   //시급 * 10 (소수점 처리)
    ) external {
        require(tutors[msg.sender].isRegistered == false , "You already did.");
        require(pay != 0, "Please submit your pay.");
        //Tutor 등록(+경매 컨트랙트 생성)
        uint256 index = allTutors.length;
        tutors[msg.sender] = Tutor(
            new TutorAuction(),
            0,
            index,
            false,
            true,
            _education,
            _career
        );
        allTutors.push(msg.sender);
        stoppedTutors.push(msg.sender);

        emit TutorRegistered(msg.sender);
    }

    function startAuction(
        uint _endPrice,
        uint _endTime
    )external {
        require(tutors[msg.sender].isRegistered, "You are not registerd.");
        require(tutors[msg.sender].inProgress == false, "You are already in progress.");
        require(_endPrice >= 0.01 ether && _endPrice <= 1 ether, "Enter between 0.01 ether and 1 ether.");
        require(_endTime >= 1 weeks && _endTime <= 12 weeks, "Enter between 1 week and 12 weeks.");

        tutors[msg.sender].auction.startAuction(_endPrice, _endTime);

        //TODO 배열 조작 필요
        emit AuctionStarted(msg.sender, _endPrice, _endTime);
    }

    //아무도 입찰하지 않았을 때 중단 가능
    function abortAuction(

    )external {
        require(tutors[msg.sender].isRegistered, "You are not registerd.");
        require(tutors[msg.sender].inProgress == true, "You did not start.");
        uint256 totalBidding = tutors[msg.sender].auction.totalBidding();
        require(totalBidding == 0, "There is bidding.");

        tutors[msg.sender].auction.stopAuction();

        emit AuctionAborted(msg.sender);
    }
}