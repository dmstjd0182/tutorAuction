// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/ITutorAuction.sol';

contract TutorAuction is ITutorAuction, Ownable{
    //종료 가격: 0.01 ether ~ 1 ether
    uint256 public endPrice; 
    //지속 시간: 1주 ~ 12주
    uint256 public endTime;
    //총 입찰(wei)
    uint256 public totalBidding;
    //경매 진행 중: 기본값 false
    bool public inProgress = false;    

    mapping(address => uint256) public bidding;

    constructor() {
        endPrice = 0;
        endTime = 0;
        inProgress = false;
    }

    function startAuction(uint _endPrice, uint _endTime) external onlyOwner {
        endPrice = _endPrice;
        endTime = _endTime;
        inProgress = true;
    }

    function stopAuction() external onlyOwner {
        endPrice = 0;
        endTime = 0;
        inProgress = false;

       
    }

    function 
}