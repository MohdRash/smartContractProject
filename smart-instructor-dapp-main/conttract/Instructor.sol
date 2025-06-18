// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Instructor {
    string fName;
    uint256 age;

    event SetInstructor(string fname);

    function setInstructor(string memory _fName, uint256 _age) public {
        fName = _fName;
        age = _age;
        emit SetInstructor(_fName);
    }

    function getInstructor() public view returns (string memory, uint256) {
        return (fName, age);
    }
}
