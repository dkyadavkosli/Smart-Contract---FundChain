require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat", 
  networks: {
    hardhat: {},
    localhost:{
      url: "http://localhost:7545",
      chainId: 1337,
      gas: 2100000,
      gasPrice: 8000000000,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    polygon: {
      url: 'https://matic-mumbai.chainstacklabs.com/',
      accounts: [PRIVATE_KEY2],
      chainId: 80001,
    },
  },
};
