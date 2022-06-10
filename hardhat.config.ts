import "dotenv/config"
import { HardhatUserConfig } from "hardhat/types"
import { task } from "hardhat/config"
import { ethers } from "ethers"

import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "hardhat-contract-sizer"
// TODO: reenable solidity-coverage when it works
// TODO: use the hardhat-deploy plugin
// import "hardhat-deploy"
// import "solidity-coverage"

// Add some .env individual variables
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY
const ALCHEMYAPI_URL = process.env.ALCHEMYAPI_URL

const MNEMONIC = process.env.MNEMONIC

// Use AlchemyAPI to make fork if its URL specifyed else use the Infura API
const FORKING_URL = ALCHEMYAPI_URL || `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`

const BLOCK_NUMBER: number | undefined = 12893772

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.14",
        settings: {
          optimizer: {runs: 1, enabled: true},
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 12450000 * 100,
      forking: {
        url: FORKING_URL,
        // specifing blockNumber available only for AlchemyAPI
        blockNumber: ALCHEMYAPI_URL ? BLOCK_NUMBER : undefined,
      },
      accounts: {
        count: 20,
        accountsBalance: ethers.utils.parseEther('1000000').toString(),
      },
    },
    localhost: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 1,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 42,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    polygon_mainnet: {
      url: `https://rpc-mainnet.maticvigil.com/`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    polygon_testnet: {
      url: `https://matic-testnet-archive-rpc.bwarelabs.com`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 80001,
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 56,
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 97,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  mocha: {
    timeout: 20000000,
  },
  paths: {
    sources: "./contracts/",
    tests: "./tests/",
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
}

task("generate-wallet", "Generate q new wallet and prints its privateKey, address and mnemonic")
  .setAction(async () => {
    const wallet = ethers.Wallet.createRandom()
    console.log(`New wallet private key is ${wallet.privateKey}`)
    console.log(`New wallet public address is ${wallet.address}`)
    console.log(`New wallet mnemonic is ${JSON.stringify(wallet.mnemonic)}`)
  })

export default config
