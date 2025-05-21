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

## Initial Transaction Analysis

We first analyzed the provided transaction calldata to check if they matched the specification:

```
=== Metagov USDC Transfer Analysis ===
{
  selector: 'a9059cbb',
  address: '0x91c32893216de3ea0a55abb9851f581d4503d39b',
  amountBigInt: 2305843009n,
  amountInUSDC: 2305.843009,
  humanReadable: '2,305.843 USDC to 0x91c32893216de3ea0a55abb9851f581d4503d39b'
}

=== Public Goods USDC Transfer Analysis ===
{
  selector: 'a9059cbb',
  address: '0xcd42b4c4d102cc22864e3a1341bb0529c17fd87d',
  amountBigInt: 356366352384n,
  amountInUSDC: 356366.352384,
  humanReadable: '356,366.352 USDC to 0xcd42b4c4d102cc22864e3a1341bb0529c17fd87d'
}
```

We found discrepancies:

- The Meta-governance USDC transaction was for 2,305.84 USDC instead of 589,000 USDC
- The Public Goods USDC transaction was for 356,366.35 USDC instead of 356,000 USDC
- The ENS transfer was verified as correct for 100,000 ENS

## Generating Correct Transactions

Using the project's utilities, we generated the correct calldata for the specified amounts:

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

## Final Transaction Data

The correct transaction data to be submitted is:

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

## Verification Method

The verification was conducted using the ens-treasury-utils project, which provides utilities for generating and validating transaction calldata for ENS DAO treasury operations.

The following tools were used:

- `buildUSDCTransferData` - For generating USDC transfer calldata
- `buildENSTransferData` - For generating ENS token transfer calldata
- Custom analysis scripts for decoding and validating calldata

All transactions have been verified to match the exact specifications in EP 6.11.
