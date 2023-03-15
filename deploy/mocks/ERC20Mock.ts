import { utils } from "@/deploy"
import type { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await utils.getAccounts(hre)

  const contractName = "ERC20Mock"
  const contractPath = "contracts/mocks/ERC20Mock.sol:ERC20Mock"

  const name = "ERC20Mock"
  const symbol = "E20"
  const decimals = 18  
  const contractArgs = [name, symbol, decimals]

  const deployment = await utils.deployContract(hre, contractName, contractPath, contractArgs, deployer)
  await utils.waitForConfirmation(hre, deployment)
  await utils.verifyContract(hre, deployment, contractPath, contractArgs)
}
module.exports.tags = ["ERC20Mock"]
