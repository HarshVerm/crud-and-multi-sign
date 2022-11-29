const hre = require("hardhat");

async function main() {
  const [lawyer] = await hre.ethers.getSigners();

  const MyFirstToken = await hre.ethers.getContractFactory("MyFirstToken");
  const token = await MyFirstToken.connect(lawyer).deploy(
    "MyFirstToken",
    "MFT",
    18,
    10000
  );

  await token.deployed();
  console.log(token.address, token);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
