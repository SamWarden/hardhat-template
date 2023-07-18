import hre from "hardhat"
import { Contract, ContractFactory } from "ethers"
import { expect, use as chaiUse } from "chai"
import { AddressZero } from "@ethersproject/constants"
import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { prepareSigners } from "./utils/prepare"
import { makeSnapshot, revertToSnapshot } from "./utils/time"
import {
  ERC721Mock as ERC721MockContract, ERC721Mock__factory,
} from "../build/typechain"

const { parseUnits } = hre.ethers

describe("ERC721Mock", function () {
  let ERC721Mock: ERC721Mock__factory
  
  let erc721: ERC721MockContract

  let owner: SignerWithAddress

  const TOKEN_NAME = "ERC721Mock"
  const TOKEN_SYMBOL = "ERC"
  const BASE_URI = "ipfs://0000000000000000000000000000000000000000000000000000000000000000"
  const CONTRACT_URI = "ipfs://1111111111111111111111111111111111111111111111111111111111111111"
  const INITIAL_TOTAL_SUPPLY = parseUnits("0")

  before(async function () {
    await prepareSigners(this)

    owner = this.owner

    ERC721Mock = new ERC721Mock__factory(owner)
    erc721 = await ERC721Mock.deploy(TOKEN_NAME, TOKEN_SYMBOL, BASE_URI, CONTRACT_URI)
    await erc721.waitForDeployment()
  })

  beforeEach(async function () {
    this.snapshotId = await makeSnapshot()
  })

  afterEach(async function () {
    await revertToSnapshot(this.snapshotId)
  })

  describe("Deployment", function () {
    it("OK: Deploy nft", async function () {
      await expect(ERC721Mock.deploy(TOKEN_NAME, TOKEN_SYMBOL, BASE_URI, CONTRACT_URI)).not.to.be.reverted
    })
  })

  describe("Getters", function () {
    it("OK: Get name", async function () {
      expect(await erc721.name()).to.equal(TOKEN_NAME)
    })

    it("OK: Get symbol", async function () {
      expect(await erc721.symbol()).to.equal(TOKEN_SYMBOL)
    })

    it("OK: Get baseURI", async function () {
      expect(await erc721.baseURI()).to.equal(BASE_URI)
    })

    it("OK: Get contractURI", async function () {
      expect(await erc721.contractURI()).to.equal(CONTRACT_URI)
    })

    it("OK: Get total supply", async function () {
      expect(await erc721.totalSupply()).to.equal(INITIAL_TOTAL_SUPPLY)
    })

    it("OK: Get initial balance", async function () {
      expect(await erc721.balanceOf(owner.address)).to.equal(INITIAL_TOTAL_SUPPLY)
    })
  })
  
  describe("Mint", function () {
    it("OK: Mint one NFT", async function () {
      const mintTx = await erc721.mintToken(owner.address)
      await expect(mintTx).not.to.be.reverted
      await expect(mintTx).to.emit(erc721, "Transfer").withArgs(AddressZero, owner.address, 0n)
      expect(await erc721.totalSupply()).to.equal(1)
      expect(await erc721.balanceOf(owner.address)).to.equal(1)
    })

    it("OK: Mint several NFTs", async function () {
      const mintAmount = 100
      const mintTx = await erc721.mintTokens(owner.address, mintAmount)
      await expect(mintTx).not.to.be.reverted
      await expect(mintTx).to.emit(erc721, "Transfer").withArgs(AddressZero, owner.address, 0n)
      await expect(mintTx).to.emit(erc721, "Transfer").withArgs(AddressZero, owner.address, 99n)
      expect(await erc721.totalSupply()).to.equal(mintAmount)
      expect(await erc721.balanceOf(owner.address)).to.equal(mintAmount)
    })
  })
})
