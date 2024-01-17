import { CryptoHookFactory } from "@/types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)
type useAccountResponse ={
  connect :() => void 
}

type AccountHookFactory = CryptoHookFactory<string,useAccountResponse>
export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({provider,ethereum}) => () => {
  const {data,mutate,...swr} = useSWR(
    provider ? "web3/useAccount" : null,
    async () => {
      const accounts = await provider!.listAccounts();
      const account = accounts[0];
      
      if (!account) {
        throw "Cannot retreive account! Please, connect to web3 wallet."
      }
      return JSON.stringify(account);
    },{
      revalidateOnFocus: false
    }
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
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    mutate,
    connect
  }; 
}

export const useAccount = () => {
  const data = hookFactory({ ethereum: undefined, provider: undefined });

  return data;
}





