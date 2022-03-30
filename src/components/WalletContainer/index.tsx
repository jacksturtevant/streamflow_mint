import { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { NETWORK } from "../../utils/globals";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletContainer: FC = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl(NETWORK), [NETWORK]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [NETWORK]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="wallet-buttons">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContainer;
