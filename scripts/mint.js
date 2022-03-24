// credit - https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js
require('dotenv').config();
//"@truffle/hdwallet-provider
//const HDWalletProvider = require("truffle-hdwallet-provider");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const fs = require("fs");
const MNEMONIC = process.env.MNEMONIC; //fs.readFileSync(".secret").toString().trim();
const NODE_API_KEY = "9403ee03acdf42088eb7cb1ec0e43ea9"; //infurakey for rinkeby
const NFT_CONTRACT_ADDRESS = "0xC1e67310909f2b8f852ed7aae009c554f1EaD1bE";   //EACollectible Contract Address
const OWNER_ADDRESS = "0xF89cAE4Be6d11a98a531cb1c7bbbBe3D321c6A96";
const NUM_NFT_TOKENS = 10;
const NFT_ABI = JSON.parse(fs.readFileSync("./build/contracts/EACollectible.json"));

async function main() {
  const provider = new HDWalletProvider( MNEMONIC,"https://rinkeby.infura.io/v3/" + NODE_API_KEY);
  const web3Instance = new web3(provider);

if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI.abi,
      NFT_CONTRACT_ADDRESS,
      {  "gas": 4712388, "gasPrice": 100000000000 }
    );

    // WaynesRealEstateToken NFTs issued directly to the owner.
    let tokenid = 100;
    let i = 0;
    result = await nftContract.methods.claimItem('https://ipfs.io/ipfs/QmdDFArLbwpoNW2xZjk1Pt6K9ggGbX6XPpLSPzzEuxAGQe').send({from:OWNER_ADDRESS});
    console.log("Address Minted. Transaction: " + result.transactionHash);
    console.log("view on opensea - https://testnets.opensea.io/assets/" + NFT_CONTRACT_ADDRESS + "/1");
  } else {
    console.error("Add NFT_CONTRACT_ADDRESS to the environment variables");
  }
}

main();
