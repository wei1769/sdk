import { GraphQLClient } from "graphql-request";
import { useAnchorWallet, AnchorWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from 'react';
import { SDK } from "@gumhq/sdk";
import { Connection, ConfirmOptions, Cluster } from "@solana/web3.js";

const useGum = (connection: Connection, opts: ConfirmOptions, cluster: Cluster, graphqlClient?: GraphQLClient) => {
  const anchorWallet = useAnchorWallet() as AnchorWallet;
  const [sdk, setSdk] = useState<SDK | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      if (!anchorWallet) {
        throw new Error("Wallet not connected");
      }

      const sdkInstance = new SDK(
        anchorWallet,
        connection,
        opts,
        cluster,
        graphqlClient
      );

      setSdk(sdkInstance);
    } catch (err: any) {
      setError(err);
    }

  }, [anchorWallet, connection, opts, cluster, graphqlClient]);

  return { sdk, error };
};

export default useGum;
