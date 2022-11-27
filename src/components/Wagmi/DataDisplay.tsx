import { useAccount, useNetwork, useBalance } from "wagmi"


export const AccountData = (): JSX.Element | null => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })


  if (!isConnected) return null

  return (
    <>
      {address && <div>Address: {address}</div>}
      {chain && <div>Connected to {chain?.name}</div>}
      {balance && <div>Balance: {balance?.formatted} {balance.symbol}</div>}
    </>
  )

  return null
}
