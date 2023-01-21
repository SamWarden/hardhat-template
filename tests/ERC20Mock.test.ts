import hre from "hardhat"
import { Contract, ContractFactory, BigNumber } from "ethers"
import { expect, use as chaiUse } from "chai"
import { AddressZero } from "@ethersproject/constants"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { prepareSigners } from "./utils/prepare"
import { makeSnapshot, revertToSnapshot } from "./utils/time"
import {
  ERC20Mock as ERC20MockContract, ERC20Mock__factory,
} from "../build/typechain"

const { parseUnits } = hre.ethers.utils

describe("ERC20Mock", async function () {
  let ERC20Mock: ERC20Mock__factory
  
  let erc20: ERC20MockContract

  let owner: SignerWithAddress

  const TOKEN_NAME = "ERC20Mock"
  const TOKEN_SYMBOL = "ERC"
  const TOKEN_DECIMALS = 18
  const INITIAL_TOTAL_SUPPLY = parseUnits("0")

  before(async function () {
    await prepareSigners(this)

    owner = this.owner

    ERC20Mock = new ERC20Mock__factory(owner)
    erc20 = await ERC20Mock.deploy(TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
    await erc20.deployed()
  })

  beforeEach(async function () {
    this.snapshotId = await makeSnapshot()
  })

  afterEach(async function () {
    await revertToSnapshot(this.snapshotId)
  })

  describe("Deployment", async function () {
    it("OK: Deploy token", async function () {
      const erc20 = await ERC20Mock.deploy(TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
      await erc20.deployed()
    })
  })

  describe("Getters", async function () {
    it("OK: Get name", async function () {
      expect(await erc20.name()).to.equal(TOKEN_NAME)
    })

    it("OK: Get symbol", async function () {
      expect(await erc20.symbol()).to.equal(TOKEN_SYMBOL)
    })

    it("OK: Get decimals", async function () {
      expect(await erc20.decimals()).to.equal(TOKEN_DECIMALS)
    })

    it("OK: Get total supply", async function () {
      expect(await erc20.totalSupply()).to.equal(INITIAL_TOTAL_SUPPLY)
    })

    it("OK: Get initial balance", async function () {
      expect(await erc20.balanceOf(owner.address)).to.equal(INITIAL_TOTAL_SUPPLY)
    })
  })
})
