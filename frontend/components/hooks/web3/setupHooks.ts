import { Web3Dependencies } from "@/types/hooks";
import { hookFactory as createAccountHook,UseAccountHook } from "./useAccount"
import { hookFactory as createNetworkHook } from "./useNetwork";
import { hookFactory as createContractHook } from "./useContract";
import { UseNetworkHook } from "./useNetwork";
import { UseContractHook } from "./useContract";

export type Web3Hooks ={
    useAccount : UseAccountHook;
    useNetwork : UseNetworkHook;
    useContract : UseContractHook;
}

export type SetupHooks = {
    (d:Web3Dependencies) : Web3Hooks
}
export const setupHooks : SetupHooks = (deps) =>{
    return {
        useAccount : createAccountHook(deps),
        useNetwork : createNetworkHook(deps),
        useContract : createContractHook(deps),
    }
}