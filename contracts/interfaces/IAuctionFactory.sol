// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuctionFactory {

    event TutorRegistered(address tutor, string education, string career, string description, uint256 pay);
    event ProfileEdited(address tutor, string education, string career, string description, uint256 pay);
    event AuctionStarted(address tutor, uint256 endPrice, uint256 endTime);
    event AuctionAborted(address tutor);
    event RewardClaimed(address tutor, uint256 newAverageRate, uint256 tutorShare);
        
    function registerTutor(string memory _education, string memory _career, string memory _description, uint256 _pay) external;
    function editProfile(string memory _education, string memory _career, string memory _description, uint256 _pay) external;
    function startAuction(uint _endPrice, uint _endTime) external;
    function abortAuction() external;
    function claimReward() external;
    function _endAuction(address _tutor) external;
}