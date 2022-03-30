import { FC } from "react";

const ListInstructions: FC = () => {
  return (
    <div className="list-instructions">
      <h1>List a token on Solana in a few simple steps</h1>
      <h3>Prequisites</h3>
      <div>
        Install Git:{" "}
        <a
          href="https://git-scm.com/downloads"
          target={"_blank"}
          rel="noreferrer"
        >
          Git
        </a>
      </div>
      <div>
        Install Perl:{" "}
        <a
          href="https://www.perl.org/get.htmls"
          target={"_blank"}
          rel="noreferrer"
        >
          Perl
        </a>
      </div>
      <div>
        Make a Github Account:{" "}
        <a href="https://github.com/join" target={"_blank"} rel="noreferrer">
          Github
        </a>
      </div>
      <div>
        Create a Github Personal Access Token:{" "}
        <a
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
          target={"_blank"}
          rel="noreferrer"
        >
          Access Token
        </a>
      </div>
      <h3>Step 1</h3>
      <div>
        Clone the Solana Token List (Top Right):{" "}
        <a
          href="https://github.com/solana-labs/token-list/"
          target={"_blank"}
          rel="noreferrer"
        >
          Fork Repo
        </a>
      </div>
      <h3>Step 2</h3>
      <div>
        Fill out the information on the left the click "Generate List Token
        Instructions"
      </div>
      <ul>
        <li>
          Token Address: The Address for the token you are listing. This will
          automatically populate if you used this site to mint
        </li>
        <li>
          Token Logo File Path: The <strong>ABSOLUTE</strong> path for the image
          you want as your logo. Supports .svg, .png, .jpg
        </li>
        <li>Token Name: The name you want for this token</li>
        <li>
          Token Symbol: Symbol for this token. Typically 3-4 uppercase letters
          or numbers
        </li>
        <li>
          Forked Repo Address: The web address for the repo you forked in Step 1
        </li>
        <li>
          Decimals: The number of decimals for your token. This will
          automatically populate if you used this site to mint
        </li>
      </ul>
      <h3>Step 3</h3>
      <div>
        Click "Copy to Clipboard", then paste this script into your terminal
      </div>
      <h3>Step 4</h3>
      <div>
        Navigate back to the repo you forked in Step 1. You should see a
        "Compare &amp; Pull Request" button. Click this, and then create pull
        request. Your token information should automatically be added within an
        hour!
      </div>
    </div>
  );
};

export default ListInstructions;
