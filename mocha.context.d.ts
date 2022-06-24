import { BigNumber } from "ethers"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import type { ERC20Mock, ERC721Mock } from "./build/typechain"

declare module "mocha" {
  export interface Context {
    // SIGNERS
    // A common list of all signers
    signers: SignerWithAddress[]
    // The signer that is used to deploy contracts by default
    owner: SignerWithAddress

    // Names of signers from a commonly used cast of characters for cryptographic examples
    // https://en.wikipedia.org/wiki/Alice_and_Bob#Cast_of_characters
    alice: SignerWithAddress   // A generic first participant
    bob: SignerWithAddress     // A generic second participant
    carol: SignerWithAddress   // A generic third participant
    dave: SignerWithAddress    // A generic fourth participant
    eve: SignerWithAddress     // Usually a passive attacker
    faythe: SignerWithAddress  // A trusted advisor, courier or intermediary
    grace: SignerWithAddress   // A government representative. For example, Grace may try to force Alice or Bob to do something
    judy: SignerWithAddress    // A judge who may be called upon to resolve a potential dispute between participants
    mallory: SignerWithAddress // A malicious attacker
    olivia: SignerWithAddress  // An oracle, who responds to queries from other participants
    sybil: SignerWithAddress   // A pseudonymous attacker, who usually uses a large number of identities
    ted: SignerWithAddress     // A trusted arbitrator, who acts as a neutral third party

    // CONTRACTS
    token1: ERC20Mock
    token2: ERC20Mock
    token3: ERC20Mock

    erc721Mock1: ERC721Mock
    erc721Mock2: ERC721Mock
    erc721Mock3: ERC721Mock

    snapshotId: BigNumber
  }
}