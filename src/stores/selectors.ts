import { MintStore } from ".";

// These are selectors for the store. I use this because it saves a small amount of compute time
// each time these pointers are derefenced
export const mintSetSelector = (state: MintStore) => state.set;

export const mintTokenAddressSelector = (state: MintStore) =>
  state.tokenAddress;

export const mintDecimalsSelector = (state: MintStore) => state.decimals;

export const mintCreatingTokenSelector = (state: MintStore) =>
  state.creatingToken;

export const mintListTokenInstructionSelector = (state: MintStore) =>
  state.listInstructions;
