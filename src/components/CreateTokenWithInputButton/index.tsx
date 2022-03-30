import { FC, useState, useCallback } from "react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { createMint } from "@solana/spl-token";
import { NETWORK } from "../../utils/globals";
import { isValidAddress } from "../../utils/stringValidators";
import useMintStore from "../../stores";
import { mintSetSelector, mintDecimalsSelector } from "../../stores/selectors";

const CreateTokenOptions: FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = useConnection().connection;
  const setMintState = useMintStore(mintSetSelector);
  const decimals = useMintStore(mintDecimalsSelector);
  const [mintAuthority, setMintAuthority] = useState<string>("");
  const [freezeAuthority, setFreezeAuthority] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");

  const onClick = useCallback(async () => {
    setMintState((state) => {
      state.creatingToken = true;
    });
    if (!isValidAddress(mintAuthority)) {
      setAddressError("Enter a valid mint authority");
      return;
    }
    if (freezeAuthority !== "" && !isValidAddress(freezeAuthority)) {
      setAddressError("Enter a valid freeze authority or delete it entirely");
      return;
    }
    setAddressError("");
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
      new PublicKey(mintAuthority),
      freezeAuthority === "" ? null : new PublicKey(freezeAuthority),
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
  }, [publicKey, sendTransaction, connection, mintAuthority, freezeAuthority]);

  return (
    <div className="token-button-wrapper">
      <div>
        Mint With Addresses
        <div className="address-input-wrapper">
          <div className="address-name">Mint Authority</div>
          <input
            className="address-input"
            type={"text"}
            onChange={(e) => {
              console.log("change", e.target.value);
              setMintAuthority(e.target.value);
            }}
          ></input>
        </div>
        <div className="address-input-wrapper">
          <div className="address-name">Freeze Authority</div>
          <input
            className="address-input"
            type={"text"}
            onChange={(e) => {
              setFreezeAuthority(e.target.value);
            }}
          ></input>
        </div>
        {addressError !== "" && (
          <div className="address-error">{addressError}</div>
        )}
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
      </div>
    </div>
  );
};

export default CreateTokenOptions;
