const { expect } = require("chai");
const hre = require("hardhat");

describe("Wallet", function () {
  async function deployed() {
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

    return { wallet, owner1, owner2, owner3, recipient1 };
  }

  it("Owner length should be more than  0", async function () {
    const { wallet } = await deployed();
    const owners = await wallet.getOwners();
    expect(owners.length).to.be.above(0);
  });

  it("Transaction address match with recipient address", async function () {
    const { wallet, recipient1 } = await deployed();
    const transaction = await wallet.createTransfer(1, recipient1.address);
    const allTrans = await wallet.getTransfers();
    expect(allTrans[0].to).to.equal(recipient1.address);
  });
});
