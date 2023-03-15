// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IUniswapV2Factory} from "libs/uniswap-v2/contracts/interfaces/IUniswapV2Factory.sol";
import {IERC20UniswapFee} from "./interfaces/IERC20UniswapFee.sol";

abstract contract ERC20UniswapFee is IERC20UniswapFee, ERC20 {
    IUniswapV2Factory public immutable uniswapV2Factory;
    uint8 public immutable uniswapFee;

    // store pairs that were created by the uniswapV2Factory
    mapping (address => bool) public isUniswapV2Pair;
    mapping (address => bool) public isExcludedFromFees;

    address public feeRecipient;

    constructor(
        address _uniswapV2Factory,
        address _feeRecipient,
        uint8 _uniswapFee
    ) {
        uniswapV2Factory = IUniswapV2Factory(_uniswapV2Factory);
        uniswapFee = _uniswapFee;

        _setFeeRecipient(_feeRecipient);
    }

    /**
     * @dev add a pair for given token to enable tax fee for the pair
     */
    function addPairForToken(address _token) external {
        address _uniswapV2Pair = uniswapV2Factory.getPair(address(this), _token);

        if (isUniswapV2Pair[_uniswapV2Pair] || _uniswapV2Pair == address(0))
            revert CannotSetPairAddress(_uniswapV2Pair);

        isUniswapV2Pair[_uniswapV2Pair] = true;
        emit UniswapV2PairSetted(_token, _uniswapV2Pair);
    }

    /**
     * @dev set a new team wallet
     */
    function _setFeeRecipient(address _feeRecipient) internal {
        if (_feeRecipient == address(0))
            revert FeeRecipientZeroAddress();

        feeRecipient = _feeRecipient;

        emit FeeRecipientUpdated(_feeRecipient);
    }

    /**
     * @dev exclude an account from fees
     */
    function _excludeFromFees(address _account, bool _excluded) internal {
        isExcludedFromFees[_account] = _excluded;

        emit ExcludeFromFees(_account, _excluded);
    }

    /**
     * @dev exclude multiple account from fees
     */
    function _excludeMultipleAccountsFromFees(
        address[] calldata _accounts,
        bool _excluded
    ) internal {
        for(uint i = 0; i < _accounts.length; i++) {
            isExcludedFromFees[_accounts[i]] = _excluded;
        }

        emit ExcludeMultipleAccountsFromFees(_accounts, _excluded);
    }


    function _transfer(
        address from,
        address to,
        uint amount
    ) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        if (
            (isUniswapV2Pair[from] && !isExcludedFromFees[to]) ||
            (isUniswapV2Pair[to] && !isExcludedFromFees[from])
        ) {
            uint _fees = amount * uniswapFee / 100;
            amount = amount - _fees;

            super._transfer(from, feeRecipient, _fees);
        }

        super._transfer(from, to, amount);
    }
}
