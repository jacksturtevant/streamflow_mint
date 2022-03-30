import { FC } from "react";

import { NETWORK } from "../../utils/globals";
import { withRouter, RouteComponentProps } from "react-router-dom";

const CreatedTokenInfo: FC<{ tokenAddress: string } & RouteComponentProps> = ({
  tokenAddress,
  history,
}) => {
  return (
    <div className="created-token-info">
      <div>The token you created has address: </div>
      <div className="created-token-address">{tokenAddress}</div>

      <button
        onClick={() => {
          history.push("list");
        }}
        className="list-button"
      >
        Go Here To List Your Token
      </button>
      <a
        className="view-button"
        href={`https://explorer.solana.com/address/${tokenAddress}?cluster=${NETWORK}`}
        rel="noreferrer"
        target="_blank"
      >
        View it Here
      </a>
    </div>
  );
};

export default withRouter(CreatedTokenInfo);
