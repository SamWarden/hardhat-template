import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { ERC20Mock__factory, ERC721Mock__factory } from "../../build/typechain"

export async function prepareSigners(thisObject: Mocha.Context) {
  thisObject.signers = await ethers.getSigners()
  thisObject.owner = thisObject.signers[0]
  thisObject.alice = thisObject.signers[1]
  thisObject.bob = thisObject.signers[2]
  thisObject.carol = thisObject.signers[3]
  thisObject.dave = thisObject.signers[4]

  thisObject.eve = thisObject.signers[5]
  thisObject.faythe = thisObject.signers[6]
  thisObject.grace = thisObject.signers[7]
  thisObject.judy = thisObject.signers[8]
  thisObject.mallory = thisObject.signers[9]
  thisObject.olivia = thisObject.signers[10]
  thisObject.sybil = thisObject.signers[11]
  thisObject.ted = thisObject.signers[12]
}

export async function prepareERC20Tokens(thisObject: Mocha.Context, signer: SignerWithAddress) {
  const tokenFactory = new ERC20Mock__factory()

  const token1 = await tokenFactory.connect(signer).deploy("Token1", "TKN1", 18)
  await token1.waitForDeployment()
  await token1.connect(signer).mint(signer.address, ethers.parseUnits("100000"))
  thisObject.token1 = token1

  const token2 = await tokenFactory.connect(signer).deploy("Token2", "TKN2", 18)
  await token2.waitForDeployment()
  await token2.connect(signer).mint(signer.address, ethers.parseUnits("100000"))
  thisObject.token2 = token2

  const token3 = await tokenFactory.connect(signer).deploy("Token3", "TKN3", 18)
  await token3.waitForDeployment()
  await token3.connect(signer).mint(signer.address, ethers.parseUnits("100000"))
  thisObject.token3 = token3
}

export async function prepareERC721Tokens(thisObject: Mocha.Context, signer: SignerWithAddress) {
  const tokenFactory = new ERC721Mock__factory()

  const erc721Mock1 = await tokenFactory.connect(signer).deploy("ERC721Mock1", "E721M1", "ipfs://baseURI1", "ipfs://contractURI1")
  await erc721Mock1.waitForDeployment()
  thisObject.erc721Mock1 = erc721Mock1

  const erc721Mock2 = await tokenFactory.connect(signer).deploy("ERC721Mock2", "E721M2", "ipfs://baseURI2", "ipfs://contractURI2")
  await erc721Mock2.waitForDeployment()
  thisObject.erc721Mock2 = erc721Mock2

  const erc721Mock3 = await tokenFactory.connect(signer).deploy("ERC721Mock3", "E721M3", "ipfs://baseURI2", "ipfs://contractURI2")
  await erc721Mock3.waitForDeployment()
  thisObject.erc721Mock3 = erc721Mock3
}
