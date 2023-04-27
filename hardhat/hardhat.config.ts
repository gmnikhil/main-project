import {} from "module";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337,
    },
  },
};

export default config;
