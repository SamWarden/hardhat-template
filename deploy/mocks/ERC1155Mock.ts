import { utils } from "@/deploy"
import type { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await utils.getAccounts(hre)

  const contractName = "ERC1155Mock"
  const contractPath = "contracts/mocks/ERC1155Mock.sol:ERC1155Mock"

  const uri = "ipfs://0000000000000000000000000000000000000000000000000000000000000000"
  const contractArgs = [uri]

  const deployment = await utils.deployContract(hre, contractName, contractPath, contractArgs, deployer)
  await utils.waitForConfirmation(hre, deployment)
  await utils.verifyContract(hre, deployment, contractPath, contractArgs)
}
module.exports.tags = ["ERC1155Mock"]
