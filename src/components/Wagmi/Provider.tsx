import {
  WagmiConfig,
  createClient,
  configureChains,
  chain
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import React from 'react'


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  // supported by Infura
  [chain.mainnet, chain.goerli, chain.polygon], [
  infuraProvider({ apiKey: "3c9b697bcf414df8b2e59f7f5523a93a" }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Web3 App',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
        shimChainChangedDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})


interface WagmiProviderProps {
  children: React.ReactNode
}

export const WagmiProvider = ({ children }: WagmiProviderProps): JSX.Element => {
  return <WagmiConfig client={client}>
    {children}
  </WagmiConfig>
}