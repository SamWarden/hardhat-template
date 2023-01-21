import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log("deployer:", deployer)
  
  const name = "ERC20Mock"
  const symbol = "E20"
  const decimals = 18  

  console.log("Deploying a contract with name = %s, symbol = %s, decimals = %s", name, symbol, decimals)
  const erc20 = await deploy("ERC20Mock", {
    args: [
      name,
      symbol,
      decimals,
    ],
    from: deployer,
    log: true,
  })
  console.log(erc20)

  await hre.ethers.provider.waitForTransaction(erc20.transactionHash!, 10)

  console.log("Verifying")
  await hre.run("verify:verify", {
    contract: "contracts/mocks/ERC20Mock.sol:ERC20Mock",
    address: erc20.address,
    constructorArguments: [
      name,
      symbol,
      decimals,
    ],
  })
  console.log("VERIFICATION COMPLETE")
}
module.exports.tags = ["ERC20Mock"]
