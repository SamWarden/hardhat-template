import type { Address, DeployResult } from "hardhat-deploy/dist/types"
import type { HardhatRuntimeEnvironment } from "hardhat/types"

const IGNORED_NETWORKS = ["hardhat", "localhost", "custom"]


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
  wait?: boolean,
): Promise<void> {
  if (deployment.transactionHash === undefined) {
    throw Error("Transaction hash is undefined")
  }

  const network = await hre.ethers.provider.getNetwork()
  if ((wait === false) || (wait !== true && IGNORED_NETWORKS.includes(network.name))) {
    console.log(`Skipping confirmation waiting for the "${network.name}" network`)
    return
  }
  console.log(`Waiting for ${confirmations} confirmations for this ${deployment.transactionHash} transaction...`)
  const tx = await hre.ethers.provider.getTransaction(deployment.transactionHash)
  if (tx === null) {
    throw Error("Transaction is null")
  }
  await tx.wait(confirmations)

  // In some reason this method is not implemented now
  // await hre.ethers.provider.provider.waitForTransaction(deployment.transactionHash, confirmations)
}

export async function verifyContract(
  hre: HardhatRuntimeEnvironment,
  deployment: DeployResult,
  contractPath: string,
  args: any[] = [],
  verify?: boolean,
): Promise<void> {
  const network = await hre.ethers.provider.getNetwork()
  if ((verify === false) || (verify !== true && IGNORED_NETWORKS.includes(network.name))) {
    console.log(`Skipping verification for the "${network.name}" network`)
    return
  }

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
    args: [],
    proxy: {
      owner: owner,
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "DefaultProxyAdmin",
      execute: {
        init: {
          methodName: "initialize",
          args: contractArgs,
        },
      },
      upgradeIndex: 0,
    },
    log: true,
  })
  console.log("Deployed contract:", deployment.address)
  console.log("---------------------------------")

  return deployment
}
