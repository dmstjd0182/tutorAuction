// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuctionFactory {

    event TutorRegistered(address tutor);
    event AuctionStarted(address tutor, uint256 endPrice, uint256 endTime);
    event AuctionAborted(address tutor);
        
    function registerTutor(string memory _education, string memory _career, uint256 pay) external;
    function startAuction(uint _endPrice, uint _endTime) external;
}