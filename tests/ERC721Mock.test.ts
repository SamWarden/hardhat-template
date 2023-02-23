import hre from "hardhat"
import { Contract, ContractFactory, BigNumber } from "ethers"
import { expect, use as chaiUse } from "chai"
import { AddressZero } from "@ethersproject/constants"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { prepareSigners } from "./utils/prepare"
import { makeSnapshot, revertToSnapshot } from "./utils/time"
import {
  ERC721Mock as ERC721MockContract, ERC721Mock__factory,
} from "../build/typechain"

const { parseUnits } = hre.ethers.utils

describe("ERC721Mock", async function () {
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
    await erc721.deployed()
  })

  beforeEach(async function () {
    this.snapshotId = await makeSnapshot()
  })

  afterEach(async function () {
    await revertToSnapshot(this.snapshotId)
  })

  describe("Deployment", async function () {
    it("OK: Deploy nft", async function () {
      await expect(ERC721Mock.deploy(TOKEN_NAME, TOKEN_SYMBOL, BASE_URI, CONTRACT_URI)).not.to.be.reverted
    })
  })

  describe("Getters", async function () {
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
})
