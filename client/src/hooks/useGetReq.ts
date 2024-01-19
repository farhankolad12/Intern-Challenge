import { useEffect, useState } from "react";

export function useGetReq(params: any, endpoint: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any | undefined>();

  useEffect(() => {
    (async () => {
      setData(undefined);
      setLoading(true);
      await fetch(
        `http://localhost:4000/api${endpoint}${
          params ? "?" + new URLSearchParams(params) : ""
        }`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (res) => {
          const d = await res.json();
          setData(d);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    })();
  }, [params]);

  return { loading, error, data };
}
