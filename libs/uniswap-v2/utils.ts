import fs from "fs"
import type { UniswapV2Addresses, UniswapV2AddressesCollection } from "./types"


export function loadUniswapV2Addresses(): UniswapV2AddressesCollection {
	const {
		UniswapV2Router02: uniswapRouterAddresses,
		UniswapV2Factory: uniswapFactoryAddresses,
	} = JSON.parse(fs.readFileSync("libs/uniswap-v2/addresses.json", {encoding: "utf8"}))

	return { uniswapRouterAddresses, uniswapFactoryAddresses }
}


export function loadUniswapV2AddressesForNetwork(network: string = "minnet"): UniswapV2Addresses {
	const { uniswapRouterAddresses, uniswapFactoryAddresses } = loadUniswapV2Addresses()
	const uniswapRouterAddress = uniswapRouterAddresses[network]
	const uniswapFactoryAddress = uniswapFactoryAddresses[network]

	return { uniswapRouterAddress, uniswapFactoryAddress }
}
