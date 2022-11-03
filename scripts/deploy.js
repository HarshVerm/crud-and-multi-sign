// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  ////////////////////
  const User = await hre.ethers.getContractFactory("User");
  const user = await User.deploy();
  await user.deployed();
  const totalNumberOfEmployee1 = await user.totalEmployees();
  const response = await user.create(
    "Krishna",
    "krishna@gmail.com",
    23,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  const response2 = await user.create(
    "Krishna",
    "krishna1@gmail.com",
    23,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  const response3 = await user.create(
    "Krishna",
    "krishna2@gmail.com",
    23,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  const totalNumberOfEmployee2 = await user.totalEmployees();
  // console.log(totalNumberOfEmployee2);
  const employee = await user.employees(1);
  // console.log(employee);
  const userDetail = await user.getEmpDetail("krishna1@gmail.com");
  // const deleteEmp = await user.deleteEmp("krishna1@gmail.com");
  // const employee1 = await user.employees(1);
  const userDetail1 = await user.getEmpDetail("krishna1@gmail.com");
  console.log(userDetail1);
  const totalNumberOfEmployee3 = await user.totalEmployees();
  ////////////////////////////////////
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
