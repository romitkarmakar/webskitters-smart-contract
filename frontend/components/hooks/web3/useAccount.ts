import { CryptoHookFactory } from "@/types/hooks";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)

type AccountHookFactory = CryptoHookFactory<string>
export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({provider}) => (params) => {
  const swrRes = useSWR(provider?"web3/useAccount":null, () => {
    // making request to get data
    return "Test User"
  })

  return swrRes;
}

export const useAccount = () => {
  const data = hookFactory({ ethereum: undefined, provider: undefined });

  return data;
}
// export const useAccount =(deps) => {
//     const data=hookFactory(deps);
//     return data;
//   }

// export const useAccount = (deps:any) => (params = '') => { // Initializing params to empty string by default
//     const data = hookFactory(deps)(params);
//     return data;
//   }

