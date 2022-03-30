const generateJSON = (
  tokenAddress: string,
  tokenFileType: string,
  tokenName: string,
  tokenSymbol: string,
  decimals: number
) => {
  return `    {
        \\"chainId\\": 101,
        \\"address\\": \\"${tokenAddress}\\",
        \\"symbol\\": \\"${tokenSymbol}\\",
        \\"name\\": \\"${tokenName}\\",
        \\"decimals\\": ${decimals},
        \\"logoURI\\": \\"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${tokenAddress}/logo.${tokenFileType}\\",
        \\"tags\\": [],
        \\"extensions\\": {}
      },`;
};

export const generateCommands = (
  tokenAddress: string,
  tokenFilePath: string,
  tokenFileType: string,
  forkedRepo: string,
  tokenName: string,
  tokenSymbol: string,
  decimals: number
) => {
  return `
    cd ~
    git clone ${forkedRepo}
    cd token-list
    git checkout -b ${tokenName}/${tokenSymbol}
    cp ${tokenFilePath} .
    mkdir assets/mainnet/${tokenAddress}
    mv ${
      tokenFilePath.split("/").slice(-1)[0]
    } assets/mainnet/${tokenAddress}/logo.${tokenFileType}
    perl -i -l -p -e 'print "${generateJSON(
      tokenAddress,
      tokenFileType,
      tokenName,
      tokenSymbol,
      decimals
    )}" if $. == 60' src/tokens/solana.tokenlist.json
    git add assets/mainnet
    git add src/tokens
    git commit -m 'add new token with address ${tokenAddress}'
    git push --set-upstream origin ${tokenName}/${tokenSymbol}
    `;
};
