import JSBI from "jsbi";

export const SOLIDITY_TYPE_MAXIMA = {
  uint8: JSBI.BigInt("0xff"),
  uint256: JSBI.BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  ),
};
