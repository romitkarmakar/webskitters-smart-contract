import { useHooks, useweb3 } from "../providers/web3";

export const useAccount = () => {
    // const hooks = useHooks();
    const { hooks } = useweb3();
    const swrRes = hooks.useAccount()

    return {
        account: swrRes
    }
}

export const useNetwork = () =>{
    const {hooks} = useweb3()
    const swrRes = hooks.useNetwork()

    return {
        network : swrRes
    }
}