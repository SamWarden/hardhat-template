import { HardhatRuntimeEnvironment } from 'hardhat/types'

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log('deployer:', deployer)
  
  const uri = 'ipfs://0000000000000000000000000000000000000000000000000000000000000000'

  console.log('Deploying a contract with uri = %s', uri)
  const erc1155 = await deploy('ERC1155Mock', {
    args: [
      uri,
    ],
    from: deployer,
    log: true,
  })
  console.log(erc1155)
}
module.exports.tags = ["ERC1155Mock"]
