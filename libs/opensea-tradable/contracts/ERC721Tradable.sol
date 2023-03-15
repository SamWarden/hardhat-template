// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {IProxyRegistry} from "./interfaces/IProxyRegistry.sol";

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
abstract contract ERC721Tradable is ERC721 {
    address private immutable proxyRegistry;

    constructor(address proxyRegistry_) {
        proxyRegistry = proxyRegistry_;
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        if (IProxyRegistry(proxyRegistry).proxies(owner) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}
