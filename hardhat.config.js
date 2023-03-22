require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/ugut_yQubli0CypiF9roT_O3b67VPTW1",
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/2e006acd6f4940259786902a983f9196",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },
};
