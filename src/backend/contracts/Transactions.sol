// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address payable public buyer;
    address payable public seller;
    uint256 public escrowAmount;

    enum State {AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, REFUNDED}
    State public currentState;

    modifier buyerOnly() {
        require(msg.sender == buyer, "Only buyer can call this function.");
        _;
    }

    modifier sellerOnly() {
        require(msg.sender == seller, "Only seller can call this function.");
        _;
    }

    modifier inState(State expectedState) {
        require(currentState == expectedState, "Invalid state.");
        _;
    }

    constructor(address payable _buyer, address payable _seller, uint256 _escrowAmount) {
        buyer = _buyer;
        seller = _seller;
        escrowAmount = _escrowAmount;
        currentState = State.AWAITING_PAYMENT;
    }

    function fundEscrow() external payable sellerOnly inState(State.AWAITING_PAYMENT) {
        require(msg.value == escrowAmount, "Incorrect escrow amount.");
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmPayment() external buyerOnly inState(State.AWAITING_DELIVERY) {
        currentState = State.COMPLETE;
        seller.transfer(escrowAmount);
    }
}