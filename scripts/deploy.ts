import { ethers } from "hardhat";
import path from "path";
import * as child_process from "child_process";

function copyABI() {
  const src = path.join(
    __dirname,
    "../artifacts/contracts/MainProject.sol/MainProject.json"
  );
  const dest = path.join(__dirname, "../");
  child_process.execSync(`copy ${src} ${dest}`);
}

async function main() {
  const MainProject = await ethers.getContractFactory("MainProject");
  const main_project = await MainProject.deploy();

  await main_project.deployed();
  console.log("MainProject deployed to:", main_project.address);

  copyABI();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
