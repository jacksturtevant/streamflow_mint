import { PublicKey } from "@solana/web3.js";

export const isValidAddress = (address: string) => {
  try {
    let pubkey = new PublicKey(address);
    let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
    return isSolana;
  } catch (error) {
    return false;
  }
};
