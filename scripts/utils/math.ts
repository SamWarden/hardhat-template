import { BigNumberish, formatUnits, parseUnits } from "ethers";

export function formatAllUnits(arr: bigint[], unitName?: BigNumberish): string[] {
  return arr.map((item) => formatUnits(item, unitName))
}

export function parseAllUnits(arr: string[], unitName?: BigNumberish): bigint[] {
  return arr.map((item) => parseUnits(item, unitName))
}
