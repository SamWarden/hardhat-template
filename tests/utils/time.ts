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

export async function setNextBlockTime(time: number | bigint): Promise<void> {
  await ethers.provider.send("evm_setNextBlockTimestamp", [time])
}

export async function setTime(time: bigint): Promise<void> {
  await setNextBlockTime(time)
  await advanceBlock()
}

export async function getCurrentBlockTime(): Promise<bigint> {
  const block = await ethers.provider.getBlock("latest")
  if (!block) {
    throw new Error("No block found")
  }
  return BigInt(block.timestamp)
}

export async function advanceTimeAndBlock(time: bigint): Promise<void> {
  await advanceTime(time)
  await advanceBlock()
}

export async function advanceTime(time: number | bigint): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [time])
}

export async function makeSnapshot(): Promise<bigint> {
  return hre.network.provider.send("evm_snapshot")
}

export async function revertToSnapshot(snapshotId: bigint): Promise<void> {
  await hre.network.provider.send("evm_revert", [snapshotId])
}

export const duration = {
  seconds: function (val: bigint): bigint {
    return val
  },
  minutes: function (val: bigint): bigint {
    return val * this.seconds(60n)
  },
  hours: function (val: bigint): bigint {
    return val * this.minutes(60n)
  },
  days: function (val: bigint): bigint {
      return val * this.hours(24n)
  },
  weeks: function (val: bigint): bigint {
    return val * this.days(7n)
  },
  years: function (val: bigint): bigint {
    return val * this.days(365n)
  },
}
