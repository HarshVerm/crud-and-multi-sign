// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract User{
  string name;

    uint age;


    constructor(string memory _name, uint _age){
        name = _name;
        age = _age;
    }

    
    function getName() external view returns(string memory) {
        return name;
    }


    function getAge() external view returns(uint) {
        return age;
    }



    function returnAgeDouble() external view returns (uint){

        return age*2;

    }

}