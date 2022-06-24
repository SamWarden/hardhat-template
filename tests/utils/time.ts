import { BigNumber } from "ethers"
import hre from "hardhat"

const { ethers } = hre

export async function advanceBlock(): Promise<any> {
  return ethers.provider.send("evm_mine", [])
}

export async function advanceBlocks(blockNumber: number = 1): Promise<void> {
  for (let i = 0; i < blockNumber; i++) {
    await advanceBlock()
  }
}

export async function advanceBlockTo(blockNumber: number): Promise<void> {
  for (let i = await ethers.provider.getBlockNumber(); i < blockNumber; i++) {
    await advanceBlock()
  }
}

export async function increaseTime(value: BigNumber): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [value.toNumber()])
  await advanceBlock()
}

export async function setNextBlockTime(time: BigNumber): Promise<void> {
  await ethers.provider.send("evm_setNextBlockTimestamp", [time])
}

export async function setTime(time: BigNumber): Promise<void> {
  await setNextBlockTime(time)
  await advanceBlock()
}

export async function getCurrentBlockTime(): Promise<BigNumber> {
  const block = await ethers.provider.getBlock("latest")
  return BigNumber.from(block.timestamp)
}

export async function advanceTimeAndBlock(time: BigNumber): Promise<void> {
  await advanceTime(time.toNumber())
  await advanceBlock()
}

export async function advanceTime(time: number): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [time])
}

export async function makeSnapshot(): Promise<BigNumber> {
  return hre.network.provider.send("evm_snapshot")
}

export async function revertToSnapshot(snapshotBlock: BigNumber): Promise<void> {
  await hre.network.provider.send("evm_revert", [snapshotBlock])
}

export const duration = {
  seconds: function (val: string): BigNumber {
    return BigNumber.from(val)
  },
  minutes: function (val: string): BigNumber {
    return BigNumber.from(val).mul(this.seconds("60"))
  },
  hours: function (val: string): BigNumber {
    return BigNumber.from(val).mul(this.minutes("60"))
  },
  days: function (val: string): BigNumber {
      return BigNumber.from(val).mul(this.hours("24"))
  },
  weeks: function (val: string): BigNumber {
    return BigNumber.from(val).mul(this.days("7"))
  },
  years: function (val: string): BigNumber {
    return BigNumber.from(val).mul(this.days("365"))
  },
}
