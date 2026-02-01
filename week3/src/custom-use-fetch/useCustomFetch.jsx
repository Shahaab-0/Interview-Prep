import { useState } from "react";
const STALE_TIME = 1 * 60 * 1000;
const cachedData = {};

const useCustomFetch = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async (url) => {
    const currentTime = Date.now();
    if (currentTime - cachedData[url]?.lastFetchOn <= STALE_TIME) {
      setState((prev) => {
        return { ...prev, data: cachedData[url].data };
      });
      return;
    }
    try {
      setState((prev) => {
        return { ...prev, loading: true };
      });
      const response = await fetch(url);
      const jsonParsedResponse = await response.json();
      const formattedData = {
        lastFetchOn: Date.now(),
        data: jsonParsedResponse,
      };
      cachedData[url] = formattedData;
      setState((prev) => {
        return { ...prev, data: jsonParsedResponse, error : null };
      });
    } catch (error) {
      setState((prev) => {
        return { ...prev, error: error };
      });
    } finally {
      setState((prev) => {
        return { ...prev, loading: false };
      });
    }
  };
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    fetchData,
  };
};
export default useCustomFetch;
