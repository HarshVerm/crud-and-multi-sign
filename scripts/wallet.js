const hre = require("hardhat");

async function main() {
  const [owner1, owner2, owner3, recipient1] = await hre.ethers.getSigners();
  const threshold = 3;

  const MultiSignerWallet = await hre.ethers.getContractFactory(
    "MultiSignerWallet"
  );
  const wallet = await MultiSignerWallet.deploy(
    [owner1.address, owner2.address, owner3.address],
    threshold
  );
  await wallet.deployed();

  await wallet.deposit({ value: 3 });

  const owners = await wallet.getOwners();
  const sender = await wallet.getSender();

  const transfer = await wallet.createTransfer(1, recipient1.address);
  await transfer.wait();

  const approver1 = await wallet.connect(owner1).approveTransfer(0);
  await approver1.wait();

  const approver2 = await wallet.connect(owner2).approveTransfer(0);
  await approver2.wait();
  const transfers = await wallet.getTransfers();

  console.log(transfers);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
