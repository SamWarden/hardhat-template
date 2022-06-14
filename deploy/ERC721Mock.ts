import { HardhatRuntimeEnvironment } from 'hardhat/types'

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log('deployer:', deployer)
  
  const name = 'ERC721Mock'
  const symbol = 'E721'

  console.log('Deploying a contract with name = %s, symbol = %s', name, symbol)
  const erc721 = await deploy('ERC721Mock', {
    args: [
      name,
      symbol,
    ],
    from: deployer,
    log: true,
  })
  console.log(erc721)
}
module.exports.tags = ["ERC721Mock"]
