import type { Address, DeployResult } from "hardhat-deploy/dist/types"
import type { HardhatRuntimeEnvironment } from "hardhat/types"


export async function getAccounts(hre: HardhatRuntimeEnvironment): Promise<{ [name: string]: Address }> {
  const { deployer, owner } = await hre.getNamedAccounts()
  console.log("=================================")
  console.log("Deployer:", deployer)
  console.log("Owner:", owner)
  console.log("---------------------------------")

  return { deployer, owner }
}

export async function deployContract(
  hre: HardhatRuntimeEnvironment,
  contractName: string,
  contractPath: string,
  contractArgs: any[],
  deployer: string,
): Promise<DeployResult> {
  console.log(`Deploying the ${contractName} contract`)
  console.log("Args:", contractArgs)
  const deployment = await hre.deployments.deploy(contractName, {
    contract: contractPath,
    from: deployer,
    args: contractArgs,
    log: true,
  })
  console.log("Deployed contract:", deployment.address)
  console.log("---------------------------------")

  return deployment
}

export async function waitForConfirmation(
  hre: HardhatRuntimeEnvironment,
  deployment: DeployResult,
  confirmations: number = 10,
): Promise<void> {
  if (deployment.transactionHash === undefined) {
    throw Error("Transaction hash is undefined")
  }
  console.log(`Waiting for ${confirmations} confirmations for this ${deployment.transactionHash} transaction...`)
  await hre.ethers.provider.waitForTransaction(deployment.transactionHash, confirmations)
}

export async function verifyContract(
  hre: HardhatRuntimeEnvironment,
  deployment: DeployResult,
  contractPath: string,
  args: any[] = [],
): Promise<void> {
  console.log("Verifying")
  await hre.run("verify:verify", {
    contract: contractPath,
    address: deployment.address,
    constructorArguments: args,
    compilerversion: "0.8.19",
  })
  console.log("Verification complete")
}

export async function deployUpgradeableContract(
  hre: HardhatRuntimeEnvironment,
  contractName: string,
  contractPath: string,
  contractArgs: any[],
  deployer: string,
  owner: string,
): Promise<DeployResult> {
  console.log(`Deploying the ${contractName} contract`)
  console.log("Args:", contractArgs)
  const deployment = await hre.deployments.deploy(contractName, {
    contract: contractPath,
    from: deployer,
    args: contractArgs,
    proxy: {
      owner: owner,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "DefaultProxyAdmin",
      execute: {
        init: {
          methodName: "initialize",
          args: [
          ],
        }
      },
      upgradeIndex: 0,
    },
    log: true,
  })
  console.log("Deployed contract:", deployment.address)
  console.log("---------------------------------")

  return deployment
}
