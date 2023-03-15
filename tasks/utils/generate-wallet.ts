import { task } from "hardhat/config"


task("generate-wallet", "Generates a new wallet and prints its privateKey, address and mnemonic")
  .setAction(async (_taskArgs, hre) => {
    const wallet = hre.ethers.Wallet.createRandom()
    console.log(`New wallet private key is ${wallet.privateKey}`)
    console.log(`New wallet public address is ${wallet.address}`)
    console.log(`New wallet mnemonic is ${JSON.stringify(wallet.mnemonic)}`)
  })
