import { HardhatRuntimeEnvironment } from 'hardhat/types'

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log('deployer:', deployer)
  
  const name = 'ERC20Mock'
  const symbol = 'E20'
  const decimals = 18  

  console.log('Deploying a contract with name = %s, symbol = %s, decimals = %s', name, symbol, decimals)
  const erc20 = await deploy('ERC20Mock', {
    args: [
      name,
      symbol,
      decimals,
    ],
    from: deployer,
    log: true,
  })
  console.log(erc20)
}
module.exports.tags = ["ERC20Mock"]
