import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, createWeb3State, loadContract } from "./utils";
import { ethers } from "ethers";

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<any> = ({ children }) => {
    const [web3Api, setweb3Api] = useState<Web3State>(createDefaultState())

    const ethereum = typeof window !== 'undefined' ? window.ethereum : null;
    const provider = ethereum ? new ethers.BrowserProvider(ethereum) : null;

    useEffect(() => {
        async function initWeb3() {
            const contract = await loadContract("GoldToken", provider!);

            setweb3Api(createWeb3State({
                ethereum: window.ethereum,
                provider,
                contract,
                isLoading: false
            }))
        }
        initWeb3();
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
export function useHooks() {
    const { hooks } = useweb3();
    return hooks;
  }
export default Web3Provider