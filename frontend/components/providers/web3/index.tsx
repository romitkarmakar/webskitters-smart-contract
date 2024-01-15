import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, loadContract } from "./utils";
import { ethers } from "ethers";
import { setupHooks } from "@/components/hooks/web3/setupHooks";

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<any> = ({ children }) => {
    const [web3Api, setweb3Api] = useState<Web3State>(createDefaultState())

    const ethereum = typeof window !== 'undefined' ? window.ethereum : null;
    const provider = ethereum ? new ethers.BrowserProvider(ethereum) : null;

    useEffect(() => {
        async function initweb3api() {
            const contract = await loadContract("GoldToken", provider);

            setweb3Api({
                ethereum: window.ethereum,
                provider: provider,
                contract,
                isLoading: false,
                hooks : setupHooks({ethereum:window.ethereum, provider, contract})
            })
        }
        initweb3api()
    }, [])
    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useweb3() {
    return useContext(Web3Context)
}

export default Web3Provider