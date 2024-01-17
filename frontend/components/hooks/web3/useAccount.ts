import { CryptoHookFactory } from "@/types/hooks";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)

type AccountHookFactory = CryptoHookFactory<string>
export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({provider,ethereum}) => () => {
  const swrRes = useSWR(
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

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swrRes,
    connect
  }; 
}

export const useAccount = () => {
  const data = hookFactory({ ethereum: undefined, provider: undefined });

  return data;
}

