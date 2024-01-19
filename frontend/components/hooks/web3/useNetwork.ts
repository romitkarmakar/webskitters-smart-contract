import { CryptoHookFactory } from "@/types/hooks"
import useSWR, { SWRConfiguration } from "swr"

type UseNetworkResponse = {
    isLoading: boolean
}

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>

export const hookFactory: NetworkHookFactory = ({ provider, isLoading }) => () => {
    const {data,isValidating,mutate,...swr} = useSWR(provider ? "web3/useNetwork" : null, async() => {
        return "This is test Network"
    }, {
        revalidateOnFocus : false
    })
    return {
        ...swr,
        data,
        isValidating,
        isLoading : isLoading || isValidating,
        mutate
    }
}
