import React, { FC, useState, useCallback } from "react";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import { createMint } from "@solana/spl-token";
import { NETWORK } from "../../utils/globals";

import useMintStore from "../../stores";
import { mintSetSelector, mintDecimalsSelector } from "../../stores/selectors";

const CreateTokenButton: FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = useConnection().connection;
  const [enableFreeze, setEnableFreeze] = useState(false);
  const setMintState = useMintStore(mintSetSelector);
  const decimals = useMintStore(mintDecimalsSelector);

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    setMintState((state) => {
      state.creatingToken = true;
    });
    const newAccount = Keypair.generate();
    if (NETWORK === WalletAdapterNetwork.Mainnet) {
      //Implement Later
    } else {
      const airdropSignature = await connection.requestAirdrop(
        newAccount.publicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
    }
    createMint(
      connection,
      newAccount,
      publicKey!,
      enableFreeze ? publicKey! : null,
      decimals
    )
      .then((mint) => {
        setMintState((store) => {
          store.tokenAddress = mint.toString();
        });
      })
      .catch((error) => {
        setMintState((state) => {
          state.creatingToken = false;
        });
        console.error(error);
      });
  }, [publicKey, sendTransaction, connection]);

  return (
    <div className="token-button-wrapper">
      <div>
        Mint With Connected Wallet
        {publicKey ? (
          <>
            <div className="checkbox-wrapper">
              <input
                type={"checkbox"}
                checked={enableFreeze}
                onChange={() => {
                  setEnableFreeze(!enableFreeze);
                }}
              ></input>
              <div className="checkbox-text">
                Add Freeze Authority to Connected Wallet?
              </div>
            </div>
            <div className="address-input-wrapper">
              <div className="address-name">Decimals</div>
              <input
                className="address-input"
                type={"number"}
                onChange={(e) => {
                  setMintState((state) => {
                    state.decimals = e.target.value as unknown as number;
                  });
                }}
              ></input>
            </div>

            <button onClick={onClick} disabled={!publicKey}>
              Create Token
            </button>
          </>
        ) : (
          <div className="connect-to-mint">Connect Wallet To Mint</div>
        )}
      </div>
    </div>
  );
};

export default CreateTokenButton;
