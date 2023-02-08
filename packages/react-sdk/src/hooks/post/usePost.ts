import { SDK } from "@gumhq/sdk";
import { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";

const usePost = (sdk: SDK, postAccount: PublicKey) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        data = await sdk.post.get(postAccount);

        setProfile(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [sdk, postAccount]);

  useEffect(() => {
  fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error };
};

export default usePost;