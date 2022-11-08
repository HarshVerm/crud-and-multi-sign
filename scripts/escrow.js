const hre = require("hardhat");

async function main() {
  const [lawyer, payer, payee] = await hre.ethers.getSigners();

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  // const escrow = await Escrow.deploy(payer.address, payee.address, 100000000);
  // await escrow.deployed();
  // await escrow.connect(payer).deposit({ value: 100000000 });
  // await escrow.connect(payee).submitWork();

  // await escrow.connect(lawyer).release();

  // const contarctBal = await escrow.balanceOf();
  // const contractBalance = await hre.ethers.provider.getBalance(payee.address);
  // // hre.ethers.provider.getBalance(escrow.address);

  const escrow = await Escrow.connect(lawyer).deploy(
    "0x7A36133752456236a6092dA832b08788B3CBB549",
    "0xEe6F235a02cfdEcFa792FA4c85cdDBE9f8EFDFf6",
    1000000000000
  );

  const response = await escrow.deployed();
  console.log(response);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
