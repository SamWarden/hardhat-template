import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "ethers";

export async function getSignedMessage(signer: SignerWithAddress, hash: string): Promise<string> {
  return signer.signMessage(ethers.utils.arrayify(hash))
}
