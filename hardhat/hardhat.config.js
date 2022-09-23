require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

// create a .env file in your root folder and replace these values 
// with your own to deploy easily.
MUMBAI_URL = process.env.MUMBAI_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
