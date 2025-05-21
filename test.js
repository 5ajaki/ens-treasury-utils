const { buildUSDCTransferData } = require("./buildUSDCTransfer");
const { buildENSTransferData } = require("./buildENSTransfer");

const USDC_TEST_CASES = [
  {
    name: "Metagov Transfer",
    amount: "254000",
    address: "0x91c32893216dE3eA0a55ABb9851f581d4503d39b",
    expectedCalldata:
      "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b0000000000000000000000000000000000000000000000000000003b23946c00",
  },
  {
    name: "Ecosystem Transfer",
    amount: "836000",
    address: "0x2686A8919Df194aA7673244549E68D42C1685d03",
    expectedCalldata:
      "0xa9059cbb0000000000000000000000002686a8919df194aa7673244549e68d42c1685d03000000000000000000000000000000000000000000000000000000c2a57ba800",
  },
  {
    name: "Public Goods Transfer",
    amount: "226000",
    address: "0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d",
    expectedCalldata:
      "0xa9059cbb000000000000000000000000cd42b4c4d102cc22864e3a1341bb0529c17fd87d000000000000000000000000000000000000000000000000000000349ea65400",
  },
  {
    name: "New Metagov USDC Transfer",
    amount: "589000",
    address: "0x91c32893216dE3eA0a55ABb9851f581d4503d39b",
    expectedCalldata:
      "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b0000000000000000000000000000000000000000000000000000000089705f4100",
  },
  {
    name: "New Public Goods USDC Transfer",
    amount: "356000",
    address: "0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d",
    expectedCalldata:
      "0xa9059cbb000000000000000000000000cd42b4c4d102cc22864e3a1341bb0529c17fd87d00000000000000000000000000000000000000000000000000000052f9170000",
  },
];

const ENS_TEST_CASES = [
  {
    name: "ENS Transfer Example",
    amount: "30000",
    address: "0x91c32893216dE3eA0a55ABb9851f581d4503d39b",
    expectedCalldata:
      "0xA9059CBB00000000000000000000000091C32893216DE3EA0A55ABB9851F581D4503D39B00000000000000000000000000000000000000000000065A4DA25D3016C00000",
  },
  {
    name: "New Metagov ENS Transfer",
    amount: "100000",
    address: "0x91c32893216dE3eA0a55ABb9851f581d4503d39b",
    expectedCalldata:
      "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b00000000000000000000000000000000000000000000152d02c7e14af6800000",
  },
];

function runTests() {
  console.log("Running USDC Transfer Calldata Tests\n");
  let passCount = 0;
  let failCount = 0;

  USDC_TEST_CASES.forEach((test) => {
    try {
      console.log(`Testing ${test.name}:`);
      console.log(`Amount: ${test.amount} USDC`);
      console.log(`Address: ${test.address}`);

      const generatedCalldata = buildUSDCTransferData(
        test.address,
        test.amount
      );
      const matches =
        generatedCalldata.toLowerCase() === test.expectedCalldata.toLowerCase();

      if (matches) {
        console.log("✅ PASS - Calldata matches exactly");
        passCount++;
      } else {
        console.log("❌ FAIL - Calldata mismatch");
        console.log("Expected:", test.expectedCalldata);
        console.log("Generated:", generatedCalldata);
        failCount++;
      }
      console.log("\n");
    } catch (error) {
      console.log("❌ FAIL - Test threw an error:", error.message);
      failCount++;
    }
  });

  console.log("Running ENS Transfer Calldata Tests\n");

  ENS_TEST_CASES.forEach((test) => {
    try {
      console.log(`Testing ${test.name}:`);
      console.log(`Amount: ${test.amount} ENS`);
      console.log(`Address: ${test.address}`);

      const generatedCalldata = buildENSTransferData(test.address, test.amount);
      const matches =
        generatedCalldata.toLowerCase() === test.expectedCalldata.toLowerCase();

      if (matches) {
        console.log("✅ PASS - Calldata matches exactly");
        passCount++;
      } else {
        console.log("❌ FAIL - Calldata mismatch");
        console.log("Expected:", test.expectedCalldata);
        console.log("Generated:", generatedCalldata);
        failCount++;
      }
      console.log("\n");
    } catch (error) {
      console.log("❌ FAIL - Test threw an error:", error.message);
      failCount++;
    }
  });

  console.log("Test Summary:");
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${USDC_TEST_CASES.length + ENS_TEST_CASES.length}`);

  // Exit with error code if any tests failed
  if (failCount > 0) {
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
