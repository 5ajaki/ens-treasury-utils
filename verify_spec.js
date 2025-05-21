const { buildUSDCTransferData } = require("./buildUSDCTransfer");
const { buildENSTransferData } = require("./buildENSTransfer");

// Specification amounts
const metagovAddress = "0x91c32893216dE3eA0a55ABb9851f581d4503d39b";
const publicGoodsAddress = "0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d";

console.log("=== Generating Transactions Based on Specification ===\n");

console.log("1. Meta-governance USDC Transfer (589,000 USDC)");
const metagovUSDC = buildUSDCTransferData(metagovAddress, "589000");
console.log("Target: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
console.log("Value: 0");
console.log(`Calldata: ${metagovUSDC}`);
console.log();

console.log("2. Meta-governance ENS Transfer (100,000 ENS)");
const metagovENS = buildENSTransferData(metagovAddress, "100000");
console.log("Target: 0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72");
console.log("Value: 0");
console.log(`Calldata: ${metagovENS}`);
console.log();

console.log("3. Public Goods USDC Transfer (356,000 USDC)");
const publicGoodsUSDC = buildUSDCTransferData(publicGoodsAddress, "356000");
console.log("Target: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
console.log("Value: 0");
console.log(`Calldata: ${publicGoodsUSDC}`);
console.log();

console.log("=== JSON Format For Copy/Paste ===\n");
console.log(`1. Meta-governance USDC Transfer:
{
    "target": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "value": 0,
    "calldata": "${metagovUSDC}"
}`);

console.log(`\n2. Meta-governance ENS Transfer:
{
    "target": "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",
    "value": 0,
    "calldata": "${metagovENS}"
}`);

console.log(`\n3. Public Goods USDC Transfer:
{
    "target": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "value": 0,
    "calldata": "${publicGoodsUSDC}"
}`);
