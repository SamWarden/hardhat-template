import "dotenv/config"
import { HardhatUserConfig } from "hardhat/types"
import { ethers } from "ethers"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-solhint";
import "@nomicfoundation/hardhat-chai-matchers"
import "@openzeppelin/hardhat-upgrades"
import "@primitivefi/hardhat-dodoc"
import "@typechain/hardhat"
import "hardhat-abi-exporter"
import "hardhat-contract-sizer"
import "hardhat-deploy"
import "hardhat-gas-reporter"
import "hardhat-tracer"
import "solidity-coverage"

import "./tasks"

// Add some .env individual variables
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const ALCHEMYAPI_URL = process.env.ALCHEMYAPI_URL
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

const REPORT_GAS = process.env.REPORT_GAS || "true"
const GAS_REPORTER_TOKEN = process.env.GAS_REPORTER_TOKEN || "ETH"
const GAS_PRICE_API = process.env.GAS_PRICE_API
const REPORTER_GAS_PRICE = Number(process.env.REPORTER_GAS_PRICE) || 50

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || ""
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ""

const MNEMONIC = process.env.MNEMONIC || ""

// Use AlchemyAPI to make fork if its URL specifyed else use the Infura API
const FORKING_URL = ALCHEMYAPI_URL || `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
const BLOCK_NUMBER: number | undefined = 15073606

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999, // max runs for etherscan
          },
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
        mnemonic: MNEMONIC,
        accountsBalance: ethers.utils.parseEther('1000000').toString(),
      },
    },
    localhost: {
      gasMultiplier: 1.2,
    },
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
      chainId: 4,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 5,
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
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 20000000,
  },
  gasReporter: {
    enabled: REPORT_GAS === "true" ? true : false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: GAS_REPORTER_TOKEN,
    gasPrice: REPORTER_GAS_PRICE,
    gasPriceApi: GAS_PRICE_API,
    showTimeSpent: true,
    showMethodSig: true,
    maxMethodDiff: 10,
  },
  typechain: {
    outDir: "./build/typechain",
    externalArtifacts: ['libs/**/abis/**/*.json'],
  },
  abiExporter: {
    path: "./build/abis",
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  },
  dodoc: {
    include: [],
    runOnCompile: true,
    freshOutput: true,
    outputDir: "./docs/contracts",
  },
  paths: {
    sources: "./contracts/",
    tests: "./tests/",
    artifacts: "./build/artifacts",
    cache: "./build/cache",
    deployments: "./build/deployments",
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      kovan: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
}

export default config
