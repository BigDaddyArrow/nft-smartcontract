import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomicfoundation/hardhat-ignition-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "solidity-docgen";
import "hardhat-contract-sizer";

dotenvConfig();
let { PRIVATE_KEY, INFURA_KEY, ETHERSCAN_KEY } = process.env;

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.26",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    gasReporter: {
        enabled: true,
    },
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
            accounts: [PRIVATE_KEY as string],
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_KEY,
    },
    docgen: {
        exclude: ["mock, exposed"],
        pages: "files",
    },

    contractSizer: {
        strict: true,
        runOnCompile: true,
        except: ["exposed", "mock"],
    },
};

export default config;
