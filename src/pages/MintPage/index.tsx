import React from "react";

import CreateTokenWithWalletButton from "../../components/CreateTokenWithWalletButton";
import CreateTokenWithInputButton from "../../components/CreateTokenWithInputButton";
import CreatedTokenInfo from "../../components/CreatedTokenInfo";
import useMintStore from "../../stores";
import {
  mintCreatingTokenSelector,
  mintTokenAddressSelector,
} from "../../stores/selectors";

const MintPage: React.FC = () => {
  const tokenAddress = useMintStore(mintTokenAddressSelector);
  const isCreatingToken = useMintStore(mintCreatingTokenSelector);
  return (
    <div className="create-token-options">
      {tokenAddress ? (
        <CreatedTokenInfo tokenAddress={tokenAddress} />
      ) : isCreatingToken ? (
        <div>Creating Token...</div>
      ) : (
        <>
          <CreateTokenWithInputButton />
          <div className="or-text">OR</div>
          <CreateTokenWithWalletButton />
        </>
      )}
    </div>
  );
};

export default MintPage;
