import { CryptoHookFactory } from "@/types/hooks";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3State)

type AccountHookFactory = CryptoHookFactory<string,string>
export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = (deps) => (params) => {
    const swrRes = useSWR("web3/useAccount", () => {
    console.log(deps);
    console.log(params);
    // making request to get data
    return "Test User"
  })

  return swrRes;
}

export const useAccount =()=>{
    const data=hookFactory({ethereum: undefined, provider: undefined});

    return data;
} 
