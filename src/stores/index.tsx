import create, { SetState, GetState, Mutate, StoreApi } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import produce from "immer";
import { PublicKey, Connection } from "@solana/web3.js";

export type MintStore = {
  decimals: number;
  tokenAddress: string;
  creatingToken: boolean;
  listInstructions: string;
  set: (x: (x: MintStore) => void) => void;
};

const useMintStore = create<
  MintStore,
  SetState<MintStore>,
  GetState<MintStore>,
  Mutate<StoreApi<MintStore>, [["zustand/subscribeWithSelector", never]]>
>(
  // bug here where it doesn't recognize false as a boolean. Ignore the whole thing until zustand fixes this
  // @ts-ignore
  subscribeWithSelector((set) => {
    return {
      decimals: 0,
      tokenAddress: "",
      listInstructions: "",
      creatingToken: false,
      set: (fn) => set(produce(fn)),
    };
  })
);

export default useMintStore;
