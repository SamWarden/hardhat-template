// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
interface IProxyRegistry {
    function proxies(address account) external view returns (address);
}
