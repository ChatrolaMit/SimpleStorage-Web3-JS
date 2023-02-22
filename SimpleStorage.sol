//SPDX-Licence-Identifier:MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 favouriteNumber;

    struct People {
        uint256 favouriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavouriteNumber;

    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function retrive() public view returns (uint256) {
        return favouriteNumber;
    }

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        nameToFavouriteNumber[_name] = _favouriteNumber;
        people.push(People(_favouriteNumber, _name));
    }
}
