const ethers = require("ethers");

// Function to decode USDC calldata and extract the amount in human-readable form
function decodeUSDCCalldata(calldata) {
  // Remove 0x prefix if present
  const cleanCalldata = calldata.startsWith("0x")
    ? calldata.slice(2)
    : calldata;

  // The function selector is the first 4 bytes (8 hex chars)
  const selector = cleanCalldata.slice(0, 8);

  // The address is the next 32 bytes (64 hex chars)
  const addressHex = cleanCalldata.slice(8, 72);
  const address = "0x" + addressHex.slice(24); // Remove padding

  // The amount is the next 32 bytes (64 hex chars)
  const amountHex = cleanCalldata.slice(72, 136);
  const amountBigInt = BigInt("0x" + amountHex);

  // USDC has 6 decimals
  const amountInUSDC = Number(amountBigInt) / 1_000_000;

  return {
    selector,
    address,
    amountBigInt,
    amountInUSDC,
    humanReadable: `${amountInUSDC.toLocaleString()} USDC to ${address}`,
  };
}

// Define addresses
const metagovAddress = "0x91c32893216dE3eA0a55ABb9851f581d4503d39b";
const publicGoodsAddress = "0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d";

// Analyze Metagov USDC Transfer
console.log("=== Metagov USDC Transfer Analysis ===");
const metagovCalldata =
  "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b0000000000000000000000000000000000000000000000000000000089705f4100";
console.log(decodeUSDCCalldata(metagovCalldata));

// Analyze Public Goods USDC Transfer
console.log("\n=== Public Goods USDC Transfer Analysis ===");
const publicGoodsCalldata =
  "0xa9059cbb000000000000000000000000cd42b4c4d102cc22864e3a1341bb0529c17fd87d00000000000000000000000000000000000000000000000000000052f9170000";
console.log(decodeUSDCCalldata(publicGoodsCalldata));

// Let's generate the expected calldata using the package
const { buildUSDCTransferData } = require("./buildUSDCTransfer");

console.log(
  "\n=== Generating Calldata for Metagov USDC Transfer with Exact Amount ==="
);
console.log("Expected: " + metagovCalldata);
const exactMetagovAmount = "2305.843009";
const generatedMetagov = buildUSDCTransferData(
  metagovAddress,
  exactMetagovAmount
);
console.log(`Generated with amount ${exactMetagovAmount}: ${generatedMetagov}`);

// Clean up calldata to ensure consistent comparison
const cleanExpectedMetagov = metagovCalldata.toLowerCase().replace(/\s+/g, "");
const cleanGeneratedMetagov = generatedMetagov.toLowerCase();
console.log(`Expected length: ${cleanExpectedMetagov.length}`);
console.log(`Generated length: ${cleanGeneratedMetagov.length}`);

if (cleanExpectedMetagov.length > cleanGeneratedMetagov.length) {
  console.log(
    "Expected has extra characters:",
    cleanExpectedMetagov.slice(cleanGeneratedMetagov.length)
  );
} else if (cleanGeneratedMetagov.length > cleanExpectedMetagov.length) {
  console.log(
    "Generated has extra characters:",
    cleanGeneratedMetagov.slice(cleanExpectedMetagov.length)
  );
}

console.log(`Match: ${cleanGeneratedMetagov === cleanExpectedMetagov}`);
console.log(
  `Match without trailing zeros: ${cleanExpectedMetagov.startsWith(
    cleanGeneratedMetagov
  )}`
);

console.log(
  "\n=== Generating Calldata for Public Goods USDC Transfer with Exact Amount ==="
);
console.log("Expected: " + publicGoodsCalldata);
const exactPublicGoodsAmount = "356366.352384";
const generatedPublicGoods = buildUSDCTransferData(
  publicGoodsAddress,
  exactPublicGoodsAmount
);
console.log(
  `Generated with amount ${exactPublicGoodsAmount}: ${generatedPublicGoods}`
);
console.log(
  `Match: ${
    generatedPublicGoods.toLowerCase() === publicGoodsCalldata.toLowerCase()
  }`
);
