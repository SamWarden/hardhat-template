import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ERC721Mock__factory } from "../build/typechain/factories/build/artifacts/contracts/mocks/ERC721Mock__factory"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  console.log("deployer:", deployer)

  const name = "ERC721Mock"
  const symbol = "E721"
  const baseURI = "ipfs://QmYMemfgmkXpYjoaTicLrUVN7MjK6Nk6UAUcYaWA6i55MC/"
  const contractURI = "ipfs://QmVqNfAPSdkdben22UA9UebbQ2mBWvh5RGbw1mrjCP9Ky4"

  console.log("Deploying a contract with name = %s, symbol = %s, baseURI = %sm contractURI = %s", name, symbol, baseURI, contractURI)
  const contract = await deploy("ERC721Mock", {
    args: [
      name,
      symbol,
      baseURI,
      contractURI,
    ],
    from: deployer,
    log: true,
  });

  await hre.ethers.provider.waitForTransaction(contract.transactionHash!, 10)

  console.log("Verifying")
  await hre.run("verify:verify", {
    contract: "contracts/mocks/ERC721Mock.sol:ERC721Mock",
    address: contract.address,
    constructorArguments: [
      name,
      symbol,
      baseURI,
      contractURI,
    ],
  })
  console.log("VERIFICATION COMPLETE")

  const erc721 = ERC721Mock__factory.connect(contract.address, signer)
  const tokensAmount = 100
  console.log(await erc721.mintTokens(deployer, tokensAmount, { from: signer.address }))
}
module.exports.tags = ["ERC721Mock"]
