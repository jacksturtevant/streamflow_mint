import React, { FC, useState, useCallback } from "react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import { createMint } from "@solana/spl-token";
import { NETWORK } from "../../utils/globals";
import CreatedTokenInfo from "../CreatedTokenInfo";
import { generateCommands } from "../../utils/generateListCommands";
import { isValidAddress } from "../../utils/stringValidators";
import useMintStore from "../../stores";
import {
  mintSetSelector,
  mintDecimalsSelector,
  mintTokenAddressSelector,
} from "../../stores/selectors";

const ListTokenButton: FC = () => {
  const setMintStore = useMintStore(mintSetSelector);
  const tokenAddress = useMintStore(mintTokenAddressSelector);
  const decimals = useMintStore(mintDecimalsSelector);
  const [tokenLogoSRC, setTokenLogoSRC] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [forkedRepo, setForkedRepo] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");

  const onClick = useCallback(async () => {
    if (!isValidAddress(tokenAddress)) {
      setAddressError("Enter a valid token address");
      return;
    }
    const fileType = tokenLogoSRC.split(".")[1];
    const listCommands = generateCommands(
      tokenAddress,
      tokenLogoSRC,
      fileType,
      forkedRepo,
      tokenName.replace(" ", "_"),
      tokenSymbol,
      decimals
    );
    setMintStore((state) => {
      state.listInstructions = listCommands;
    });
  }, [
    tokenAddress,
    tokenLogoSRC,
    tokenAddress,
    forkedRepo,
    tokenName,
    tokenSymbol,
    decimals,
  ]);

  return (
    <div className="token-button-wrapper">
      <div className="address-input-wrapper">
        <div className="address-name">Token Address</div>
        <input
          className="address-input"
          type={"text"}
          defaultValue={tokenAddress}
          onChange={(e) => {
            setMintStore((store) => {
              store.tokenAddress = e.target.value;
            });
          }}
        ></input>
      </div>

      {addressError !== "" && (
        <div className="address-error">{addressError}</div>
      )}
      <div className="address-input-wrapper">
        <div className="address-name">Token Logo File Path</div>
        <input
          className="address-input"
          type={"text"}
          onChange={(e) => {
            setTokenLogoSRC(e.target.value);
          }}
        ></input>
      </div>
      <div className="address-input-wrapper">
        <div className="address-name">Token Name</div>
        <input
          className="address-input"
          type={"text"}
          onChange={(e) => {
            setTokenName(e.target.value);
          }}
        ></input>
      </div>
      <div className="address-input-wrapper">
        <div className="address-name">Token Symbol</div>
        <input
          className="address-input"
          type={"text"}
          onChange={(e) => {
            setTokenSymbol(e.target.value);
          }}
        ></input>
        <div className="address-input-wrapper">
          <div className="address-name">Forked Repo Address</div>
          <input
            className="address-input"
            type={"text"}
            onChange={(e) => {
              setForkedRepo(e.target.value);
            }}
          ></input>
        </div>
        <div className="address-input-wrapper">
          <div className="address-name">Token Decimals</div>
          <input
            className="address-input"
            type={"number"}
            defaultValue={decimals}
            onChange={(e) => {
              setMintStore((store) => {
                store.decimals = e.target.value as unknown as number;
              });
            }}
          ></input>
        </div>
      </div>
      <button onClick={onClick}>Generate List Token Instructions</button>
    </div>
  );
};

export default ListTokenButton;
