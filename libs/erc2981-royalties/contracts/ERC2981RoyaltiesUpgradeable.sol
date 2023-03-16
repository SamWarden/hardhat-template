// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC2981Royalties} from "./interfaces/IERC2981Royalties.sol";

///
/// @dev Interface for the NFT Royalty Standard
///
abstract contract ERC2981Royalties is ERC165, IERC2981Royalties {
    /// @inheritdoc	IERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||  // 0x2a55205a
            super.supportsInterface(interfaceId);
    }
}
