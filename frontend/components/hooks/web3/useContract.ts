
import { CryptoHookFactory } from "@/types/hooks"
import useSWR, { SWRConfiguration } from "swr"

export type ContractHookResponse = {
    isLoading: boolean
}

const config: SWRConfiguration = {
    revalidateOnFocus: false
}
type ContractHookFactory = CryptoHookFactory<string,ContractHookResponse>

export type UseContractHook = ReturnType<ContractHookFactory>

export const hookFactory: UseContractHook = ({ contract, isLoading }) => () => {
    const { data, mutate, isValidating, ...swr } = useSWR(contract ? "web3/useContracts" : null, async () => {
        // const someString = "Hello contract"
        // return someString
        // console.log("THIS IS THE CONTRACT ADD",await contract.getAddress())
        return contract
    }, config)
    return {
        ...swr,
        data,
        mutate,
        isLoading: isLoading as boolean
    }

}