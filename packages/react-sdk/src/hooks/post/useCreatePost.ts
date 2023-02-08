import { SDK } from "@gumhq/sdk";
import { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";

const useCreatePost = (sdk: SDK, metadataUri: String, profileAccount: PublicKey, userAccount: PublicKey, owner: PublicKey) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPost = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await sdk.post.create(metadataUri, profileAccount, userAccount, owner);
        setPost(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [sdk, metadataUri, profileAccount, userAccount, owner]
  );

  useEffect(() => {
    createPost();
  }, [createPost]);

  return { 
    instructionMethodBuilder: post ? post.instructionMethodBuilder : undefined,
    submitTransaction: post && post.instructionMethodBuilder ? post.instructionMethodBuilder.rpc() : undefined,
    postPDA: post ? post.postPDA : undefined,
    loading, 
    error 
  };
};

export default useCreatePost;