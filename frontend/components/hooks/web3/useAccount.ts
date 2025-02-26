import { CryptoHookFactory } from "@/types/hooks";
import { useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";

// deps -> provider, ethereum, contract (web3State)
type useAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
}
const config: SWRConfiguration = {
  revalidateOnFocus: false
}

type AccountHookFactory = CryptoHookFactory<string, useAccountResponse>
export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({ provider, ethereum, isLoading }) => (params) => {
  const { data, mutate, isValidating, ...swr } = useSWR(
    provider ? "web3/useAccount" : null,
    async () => {
      console.log("INSIDE")
      const accounts = await provider!.listAccounts();
      const account = accounts[0];
      console.log('THIS IS ACCOUNT :', account)
      if (!account) {
        throw "Cannot retreive account! Please, connect to web3 wallet."
      }
      return JSON.stringify(account);
      // return "This is the data"
    }, config
  )
  useEffect(() => {
    ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    }
  })

  const handleAccountsChanged = (...args: unknown[]) => {
    const accounts = args[0] as string[];
    if (accounts.length === 0) {
      console.error("Please, connect to Web3 wallet");
    } else if (accounts[0] !== data) {
      mutate(accounts[0]);
    }
  }

  const connect = async () => {
    try {
      ethereum?.request({ method: "eth_requestAccounts" });
    } catch (e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading || isValidating,
    isInstalled: ethereum?.isMetaMask || false,
    mutate,
    connect
  };
}

export const useAccount = () => {
  const data = hookFactory({ ethereum: undefined, provider: undefined });

  return data;
}





