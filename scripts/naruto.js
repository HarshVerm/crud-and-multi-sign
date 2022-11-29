const hre = require("hardhat");

async function main() {
  const [lawyer] = await hre.ethers.getSigners();

  const Naruto = await hre.ethers.getContractFactory("Naruto");
  const token = await Naruto.connect(lawyer).deploy("Naruto", "NRT");

  await token.deployed();
  console.log("Success, contract was deployed to,  ", token.address);
  const nft = await token.mint(
    "https://ipfs.io/ipfs/QmThtYqsVhzahgjuQYWz1x1ARgvEtw4FSNP95iioHR6Axj"
  );
  console.log(nft);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
