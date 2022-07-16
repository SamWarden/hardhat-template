import hre from "hardhat"
import { Contract, ContractFactory, BigNumber } from "ethers"
import { expect, use as chaiUse } from "chai"
import { AddressZero } from "@ethersproject/constants"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { prepareERC20Tokens, prepareSigners } from "./utils/prepare"
import { makeSnapshot, revertToSnapshot } from "./utils/time"

const { parseUnits } = hre.ethers.utils
chaiUse(hre.waffle.solidity)

describe("ERC20Mock", async function () {
	before(async function () {
		await prepareSigners(this)
		await prepareERC20Tokens(this, this.bob)
	})

	beforeEach(async function () {
		this.snapshotId = await makeSnapshot()
	})

	afterEach(async function () {
		await revertToSnapshot(this.snapshotId)
	})

	describe("Deployment", async function () {
		it("Should assign the total supply of tokens to the owner", async function () {
			const ownerBalance = await this.token1.balanceOf(this.bob.address)
			expect(await this.token1.totalSupply()).to.equal(ownerBalance)
		})
	})

	describe("Transactions", async function () {
		it("Should transfer tokens between accounts", async function () {
			const transferAmount = hre.ethers.utils.parseUnits("100", 6)
			await expect(this.token1.connect(this.bob).transfer(this.alice.address, transferAmount))
				.to.emit(this.token1, "Transfer")
				.withArgs(this.bob.address, this.alice.address, transferAmount)

			const aliceBalance = await this.token1.balanceOf(this.alice.address)
			expect(aliceBalance).to.equal(transferAmount)
		})

		it("Should fail if sender doesn’t have enough tokens", async function () {
			const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)
			await expect(this.token1.connect(this.carol).transfer(this.bob.address, 1)).to.be.revertedWith(
				"ERC20: transfer amount exceeds balance"
			)

			// Owner balance shouldn't have changed.
			expect(await this.token1.balanceOf(this.bob.address)).to.equal(initialOwnerBalance)
		})

		it("Should update balances after transfers", async function () {
			const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)

			const transferToMishaAmount = hre.ethers.utils.parseUnits("100", 6)
			await this.token1.connect(this.bob).transfer(this.carol.address, transferToMishaAmount)

			const transferToTemaAmount = hre.ethers.utils.parseUnits("100", 6)
			await this.token1.connect(this.bob).transfer(this.dave.address, transferToTemaAmount)

			const finalOwnerBalance = await this.token1.balanceOf(this.bob.address)
			expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(transferToTemaAmount).sub(transferToMishaAmount))

			const carolBalance = await this.token1.balanceOf(this.carol.address)
			expect(carolBalance).to.equal(transferToMishaAmount)

			const daveBalance = await this.token1.balanceOf(this.dave.address)
			expect(daveBalance).to.equal(transferToTemaAmount)
		})
	})
})
