
import { CryptoHookFactory } from "@/types/hooks"
import useSWR, { SWRConfiguration } from "swr"

export type ContractHookResponse = {
    isLoading : boolean
}

const config :SWRConfiguration ={
    revalidateOnFocus : false
}
type ContractHookFactory = CryptoHookFactory<string,ContractHookResponse>

export type UseContractHook = ReturnType<ContractHookFactory>

export const hookFactory : UseContractHook =({contract,isLoading}) => () =>{
    const {data, mutate,isValidating,error, ...swr} = useSWR(contract?"web3/useContracts":null,async()=>{
        return "Test contract"
    },config)
    return{
        ...swr,
        data,
        mutate,
        isLoading : isLoading ||isValidating,
        error
    }

}