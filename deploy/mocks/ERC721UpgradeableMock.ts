import { utils } from "@/deploy"
import type { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, owner } = await utils.getAccounts(hre)

  const contractName = "ERC721Mock"
  const contractPath = "contracts/mocks/ERC721Mock.sol:ERC721Mock"

  const name = "ERC721Mock"
  const symbol = "E721"
  const baseURI = "ipfs://QmYMemfgmkXpYjoaTicLrUVN7MjK6Nk6UAUcYaWA6i55MC/"
  const contractURI = "ipfs://QmVqNfAPSdkdben22UA9UebbQ2mBWvh5RGbw1mrjCP9Ky4"
  const contractArgs = [name, symbol, baseURI, contractURI]

  const deployment = await utils.deployUpgradeableContract(hre, contractName, contractPath, contractArgs, deployer, owner)
  await utils.waitForConfirmation(hre, deployment)
  await utils.verifyContract(hre, deployment, contractPath, [])
}
module.exports.tags = ["ERC721UpgradeableMock"]
