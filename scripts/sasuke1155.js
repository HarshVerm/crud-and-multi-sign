const hre = require("hardhat");

async function main() {
  const [lawyer] = await hre.ethers.getSigners();

  const Sasuke = await hre.ethers.getContractFactory("Sasuke1155");
  const token = await Sasuke.connect(lawyer).deploy("Minato1155", "MNT");

  await token.deployed();
  console.log("Success, contract was deployed to,  ", token.address);
  const nft = await token.mint(
    20,
    "https://ipfs.io/ipfs/QmdcER2DR4Pf9qkPXMh6aCphERcAyeVKr4UwQr42Vw89eV"
  );
  console.log(nft);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
