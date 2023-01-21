import fs from "fs"
import type { PinkSaleAddresses } from "./types"

export function loadPinkSaleAddresses(): PinkSaleAddresses {
	const {
		PinkAntiBot: pinkAntiBotAddresses,
	} = JSON.parse(fs.readFileSync('libs/pinksale/addresses.json', {encoding: 'utf8'}))

	return { pinkAntiBotAddresses }
}
