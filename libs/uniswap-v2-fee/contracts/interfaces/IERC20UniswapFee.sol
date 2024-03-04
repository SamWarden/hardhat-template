// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IUniswapV2Factory} from "../../../uniswap-v2/contracts/interfaces/IUniswapV2Factory.sol";

interface IERC20UniswapFee is IERC20 {
    error CannotSetPairAddress(address uniswapV2Pair);
    error FeeRecipientZeroAddress();

    event UniswapV2PairSetted(
        address indexed token,
        address indexed uniswapV2Pair
    );
    event ExcludeFromFees(address indexed account, bool isExcluded);
    event ExcludeMultipleAccountsFromFees(address[] accounts, bool isExcluded);
    event FeeRecipientUpdated(address indexed feeRecipient);

    /**
     * @dev add a pair for given token to enable tax fee for the pair
     */
    function addPairForToken(address _token) external;

    function uniswapV2Factory() external view returns (IUniswapV2Factory);
    function uniswapFee() external view returns (uint8);
    function isUniswapV2Pair(address _account) external view returns (bool);
    function isExcludedFromFees(address _account) external view returns (bool);
}
