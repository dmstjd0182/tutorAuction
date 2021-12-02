// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuctionFactory {

    event TutorRegistered(address tutor);
    event ProfileEdited(address tutor);
    event AuctionStarted(address tutor, uint256 endPrice, uint256 endTime);
    event AuctionAborted(address tutor);
    event RewardClaimed(address tutor, uint256 newAverageRate, uint256 tutorShare);
        
    function registerTutor(string memory _education, string memory _career, uint256 _pay) external;
    function editProfile(string memory _education, string memory _career, uint256 _pay) external;
    function startAuction(uint _endPrice, uint _endTime) external;
    function abortAuction() external;
    function claimReward() external whenCallerIsRegistered
}