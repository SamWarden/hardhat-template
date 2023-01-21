// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    uint8 internal immutable _decimals;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimalPlaces
    ) ERC20(name, symbol) {
        _decimals = decimalPlaces;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint _amount) public {
        _mint(to, _amount);
    }

    function burn(address to, uint _amount) public {
        _burn(to, _amount);
    }
}
