// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITutorAuction {

    event AuctionStopped(address winner, uint256 highestPrice);

    function startAuction(uint _endPrice, uint _endTime) external;
    function stopAuction() external;
}
