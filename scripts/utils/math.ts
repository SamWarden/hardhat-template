import { BigNumber, BigNumberish } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export function toBN(value: string | number | BigNumber): BigNumber {
  return BigNumber.from(value)
}

export function toBNs(arr: string[] | number[] | BigNumber[]): BigNumber[] {
  return arr.map(toBN)
}

export function formatAllUnits(arr: BigNumber[], unitName?: BigNumberish): string[] {
  return arr.map((item) => formatUnits(item, unitName))
}

export function parseAllUnits(arr: string[], unitName?: BigNumberish): BigNumber[] {
  return arr.map((item) => parseUnits(item, unitName))
}
