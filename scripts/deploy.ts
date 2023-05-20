import { ethers } from "hardhat";
import path from "path";
import fs from "fs";
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

  const jsonContent = { address: main_project.address };
  const jsonString = JSON.stringify(jsonContent);

  fs.writeFile("contract-config.json", jsonString, "utf8", (err) => {
    if (err) {
      console.error("Error saving JSON file:", err);
      return;
    }
    console.log("JSON file saved successfully!");
  });

  copyABI();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
