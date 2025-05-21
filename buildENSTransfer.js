const ethers = require("ethers");
const readline = require("readline");

function isValidAddress(address) {
  try {
    return ethers.isAddress(address);
  } catch (e) {
    return false;
  }
}

function isValidAmount(amount) {
  try {
    // Remove commas and try to parse
    const cleanAmount = amount.replace(/,/g, "");
    const num = parseFloat(cleanAmount);
    return !isNaN(num) && num > 0;
  } catch (e) {
    return false;
  }
}

function buildENSTransferData(destinationAddress, ensAmount) {
  // Input validation
  if (!isValidAddress(destinationAddress)) {
    throw new Error("Invalid destination address");
  }
  if (!isValidAmount(ensAmount)) {
    throw new Error("Invalid amount");
  }

  // ENS uses 18 decimal places (standard ERC20)
  const DECIMALS = 18;

  // Clean the amount by removing commas
  const cleanAmount = ensAmount.replace(/,/g, "");

  // Convert amount to smallest unit (18 decimal places)
  const amount = ethers.parseUnits(cleanAmount.toString(), DECIMALS);

  // Get the function signature for transfer(address,uint256)
  const functionSignature = "transfer(address,uint256)";
  const selector = ethers.id(functionSignature).slice(0, 10);

  // Encode the parameters
  const abiCoder = new ethers.AbiCoder();
  const params = abiCoder.encode(
    ["address", "uint256"],
    [destinationAddress, amount]
  );

  // Combine selector and parameters (remove '0x' from params)
  const calldata = selector + params.slice(2);

  return calldata;
}

// Interactive mode when run directly
async function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Get destination address
    const destination = await new Promise((resolve) => {
      rl.question("Enter destination address: ", (answer) => {
        if (!isValidAddress(answer)) {
          console.log("Invalid Ethereum address");
          process.exit(1);
        }
        resolve(answer);
      });
    });

    // Get amount
    const amount = await new Promise((resolve) => {
      rl.question("Enter ENS amount: ", (answer) => {
        if (!isValidAmount(answer)) {
          console.log("Invalid amount");
          process.exit(1);
        }
        resolve(answer);
      });
    });

    const calldata = buildENSTransferData(destination, amount);
    console.log("\nGenerated Calldata:");
    console.log(calldata);

    rl.close();
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

// Run interactive mode if called directly
if (require.main === module) {
  promptUser();
}

// Export the main function for use in other scripts
module.exports = {
  buildENSTransferData,
  isValidAddress,
  isValidAmount,
};
