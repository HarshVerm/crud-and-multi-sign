// require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-waffle");

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/pIpgNEzSPOD-ArkFERG7Dh0OI244leGr",
      accounts: [
        "",
      ],
    },
  },
};
