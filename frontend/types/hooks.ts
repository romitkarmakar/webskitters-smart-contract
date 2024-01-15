import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, BrowserProvider } from "ethers"
import { SWRResponse } from "swr";


export type Web3Dependencies = {
  provider: BrowserProvider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider
}

export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>
}