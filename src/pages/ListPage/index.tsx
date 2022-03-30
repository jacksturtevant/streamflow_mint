import React from "react";

import ListTokenButton from "../../components/ListTokenButton";
import ListInstructions from "../../components/ListInstructions";
import useMintStore from "../../stores";
import { mintListTokenInstructionSelector } from "../../stores/selectors";
import { copyTextToClipboard } from "../../utils/copy";
const ListPage: React.FC = () => {
  const listTokenInstructions = useMintStore(mintListTokenInstructionSelector);
  return (
    <div className="list-page">
      <div className="list-left">
        <ListTokenButton />
        {listTokenInstructions && (
          <div>
            <div className="list-commands">{listTokenInstructions}</div>
            <button
              onClick={() => {
                copyTextToClipboard(listTokenInstructions);
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
      <div className="list-right">
        <ListInstructions />
      </div>
    </div>
  );
};

export default ListPage;
