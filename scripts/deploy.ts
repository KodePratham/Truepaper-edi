import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TruePaper contract to BSC Testnet...");

  const TruePaper = await ethers.getContractFactory("TruePaper");
  const truePaper = await TruePaper.deploy();

  await truePaper.waitForDeployment();

  const address = await truePaper.getAddress();
  console.log(`TruePaper deployed to: ${address}`);
  console.log("\nVerify with:");
  console.log(`npx hardhat verify --network bscTestnet ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
