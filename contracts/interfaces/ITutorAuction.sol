// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITutorAuction {

    event Withdraw(address who, uint256 amount);
    event Bid(address bidder, uint256 highestBid);
    event AuctionEnded(address highestBidder, uint256 highestBid, uint256 rewardPendingUntil);
    event RateSet(address rater, uint256 rate, uint256 raterShare);

    error AuctionTimeOver();

    function startAuction(uint _endPrice, uint _endTime) external;
    function endAuction() external;
    function bid() external payable;
    function setRate(uint256 _rate) external;
    function claimReward(address tutor) external;
    function _calAverageRate() external returns (uint256);
}
