# [EP 6.11] ENS Treasury Transaction Verification Report

This report documents the verification of three treasury transactions specified in EP 6.11.

## Transaction Specification

The following transfers are to be made from the DAO treasury:

1. **Meta-governance USDC Transfer**

   - Amount: 589,000 USDC
   - Address: 0x91c32893216dE3eA0a55ABb9851f581d4503d39b

2. **Meta-governance ENS Transfer**

   - Amount: 100,000 ENS
   - Address: 0x91c32893216dE3eA0a55ABb9851f581d4503d39b

3. **Public Goods USDC Transfer**
   - Amount: 356,000 USDC
   - Address: 0xcD42b4c4D102cc22864e3A1341Bb0529c17fD87d

## Verification Process

The verification was conducted using the ens-treasury-utils project, which provides utilities for generating and validating transaction calldata for ENS DAO treasury operations:

1. Used `buildUSDCTransferData` to generate calldata for USDC transfers
2. Used `buildENSTransferData` to generate calldata for ENS token transfers
3. Executed test scripts to verify the generated calldata
4. Confirmed the calldata represents the correct token amounts and recipient addresses

```
=== Generating Transactions Based on Specification ===

1. Meta-governance USDC Transfer (589,000 USDC)
Target: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
Value: 0
Calldata: 0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b0000000000000000000000000000000000000000000000000000000892322c200

2. Meta-governance ENS Transfer (100,000 ENS)
Target: 0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72
Value: 0
Calldata: 0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b00000000000000000000000000000000000000000000152d02c7e14af6800000

3. Public Goods USDC Transfer (356,000 USDC)
Target: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
Value: 0
Calldata: 0xa9059cbb000000000000000000000000cd42b4c4d102cc22864e3a1341bb0529c17fd87d00000000000000000000000000000000000000000000000000000052e340e800
```

## Final Verified Transaction Data

Below is the final, verified transaction data that matches the specification in EP 6.11:

### 1. Meta-governance USDC Transfer (589,000 USDC)

```json
{
  "target": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "value": 0,
  "calldata": "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b0000000000000000000000000000000000000000000000000000000892322c200"
}
```

### 2. Meta-governance ENS Transfer (100,000 ENS)

```json
{
  "target": "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",
  "value": 0,
  "calldata": "0xa9059cbb00000000000000000000000091c32893216de3ea0a55abb9851f581d4503d39b00000000000000000000000000000000000000000000152d02c7e14af6800000"
}
```

### 3. Public Goods USDC Transfer (356,000 USDC)

```json
{
  "target": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "value": 0,
  "calldata": "0xa9059cbb000000000000000000000000cd42b4c4d102cc22864e3a1341bb0529c17fd87d00000000000000000000000000000000000000000000000000000052e340e800"
}
```

The calldata for each transaction has been verified to correctly represent:

- The correct token contract target address
- The specified recipient address
- The exact token amount with proper decimal handling (6 decimals for USDC, 18 for ENS)
- The proper ERC20 transfer function signature
