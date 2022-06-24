import fs from "fs"
import type { UniswapV2Addresses } from "./types"

export function loadUniswapV2Addresses(): UniswapV2Addresses {
	const {
		UniswapV2Router02: uniswapRouterAddresses,
		UniswapV2Factory: uniswapFactoryAddresses,
	} = JSON.parse(fs.readFileSync('libs/uniswap-v2/addresses.json', {encoding: 'utf8'}))

	return { uniswapRouterAddresses, uniswapFactoryAddresses }
}
