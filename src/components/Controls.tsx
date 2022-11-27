import { useAccount, useDisconnect, useNetwork, useSigner, useProvider } from "wagmi"
import { useMutation } from "@tanstack/react-query"
import { assert } from "ts-essentials"
import { styled } from "@linaria/react"

import { useOpenConnectModal } from "../state/modals"
import { Control } from "./Control"
import { AddressDisplay } from "./Wagmi/DataDisplay"

export const GetChainId = (): JSX.Element => {
  const { chainId, getChainId } = useGetChainID()
  const value = chainId && `Chain ID: ${chainId}`

  return <Control label="Get ChainID" onClick={getChainId} value={value} />
}

export const GetBalance = (): JSX.Element => {
  const { balance, getBalance } = useGetBalance()
  const { chain } = useNetwork()

  const readableBalance = balance && `Balance: ${(+balance.toString() / 1e18)} ${chain?.nativeCurrency?.symbol || ""}`

  return <Control label="Get Balance" onClick={getBalance} value={readableBalance} />
}

const TxDisplay = styled(AddressDisplay)`
  max-width: 20ch
`

export const SendTx = (): JSX.Element => {
  const { txHash, sendTx } = useSendTx()

  const value = txHash && <TxDisplay>{txHash}</TxDisplay>
  return <Control label="Send Transaction" onClick={sendTx} value={value} />
}

export const LogOut = (): JSX.Element => {
  const { disconnect } = useDisconnect()
  return <Control label="Log Out" onClick={disconnect} />
}

export const LogIn = (): JSX.Element => {
  const open = useOpenConnectModal()
  return <Control label="Log In" onClick={open} />
}

function useSendTx() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { data: signer } = useSigner()

  const { data: txHash, mutate: sendTx } = useMutation({
    mutationKey: ["sendTX", chain?.id, address],
    mutationFn: async () => {
      assert(signer, "Signer will be available at this point")
      const tx = await signer.sendTransaction({ to: address, value: 123 })
      console.log("🚀 ~ TX", tx)
      return tx.hash
    },
  })

  return { txHash, sendTx };
}


function useGetBalance() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { data: signer } = useSigner()

  const { data: balance, mutate: getBalance } = useMutation({
    mutationKey: ["getBalance", chain?.id, address],
    mutationFn: async () => {
      assert(signer, "Signer will be available at this point")
      const balance = await signer.getBalance()
      console.log("🚀 ~ BALANCE", balance.toBigInt())
      return balance
    },
  })

  return { balance, getBalance };
}



function useGetChainID() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { data: signer } = useSigner()

  const { data: chainId, mutate: getChainId } = useMutation({
    mutationKey: ["getChainID", chain?.id, address],
    mutationFn: async () => {
      assert(signer, "Signer will be available at this point")
      const chainId = await signer.getChainId()
      console.log("🚀 ~ CHAIN_ID", chainId)
      return chainId
    },
  })

  return { chainId, getChainId };
}

