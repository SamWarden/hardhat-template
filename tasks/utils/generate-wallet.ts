import { task, types } from "hardhat/config"
import { HardhatRuntimeEnvironment } from "hardhat/types"

class Wallet {
  constructor(
    readonly address: string,
    readonly privateKey: string,
    readonly mnemonic: string,
  ) {}
}

type Wallets = { [key: number]: Wallet }

function genereateWallets(hre: HardhatRuntimeEnvironment, walletsNumber: number = 1): Wallets {
  const wallets: Wallets = {}
  for (let walletId = 1; walletId <= walletsNumber; walletId++) {
    const wallet = hre.ethers.Wallet.createRandom()
    wallets[walletId] = new Wallet(wallet.address, wallet.privateKey, wallet.mnemonic!.phrase)
  }
  return wallets
}

task("generate-wallet", "Generates a new wallet and prints its privateKey, address and mnemonic")
  .addParam("number", "Number of wallets to generate", 1, types.int)
  .addFlag("json", "Prints the output in JSON format")
  .setAction(async (taskArgs: { number: number, json: boolean }, hre: HardhatRuntimeEnvironment) => {
    const wallets = genereateWallets(hre, taskArgs.number)
    if (taskArgs.json) {
      console.log(JSON.stringify(wallets, undefined, 2))
      return
    }
    for (const [walletId, wallet] of Object.entries(wallets)) {
      console.log(`Wallet ${walletId}:`);
      console.log(`Public address: ${wallet.address}`);
      console.log(`Private key: ${wallet.privateKey}`);
      console.log(`Mnemonic: ${wallet.mnemonic}`);
    }
  })
