// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MultiSignerWallet {
    address[] public owners;
    uint public threshold;

    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }

    Transfer[] public transfers;

     mapping(address => mapping(uint => bool)) public approvals;
     
     constructor(address [] memory _owners,uint _threshold ){
        owners = _owners;
        threshold=_threshold;
     }

     modifier checkSenderIsOwner(){
        bool testSender = false ;
        for (uint i=0 ; i<owners.length;i++){
            if (compareStrings( owners[i] , msg.sender)){
            testSender=true;
            break;
            }
        }
        require (testSender == true, "You are not allowed to access this function");
        _;

     }

     function getOwners() external view returns(address[] memory) {
        return owners;
     }

     function createTransfer(uint amount,address  payable to ) public  checkSenderIsOwner{
        transfers.push( Transfer(transfers.length,
        amount,to,0,false));
     }

  function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }

     function approveTransfer(uint id) external checkSenderIsOwner {
        require(transfers[id].sent == false, "transfer has already been sent");
        require(approvals[msg.sender][id] == false, "cannot approve transfer again");

        approvals[msg.sender][id] == true;
        transfers[id].approvals++;

        if(transfers[id].approvals >= threshold) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);
        }
    }

   function getSender () public view returns (address){
        return msg.sender;
    }

    function deposit() external payable {}

     function compareStrings(address a, address b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    }