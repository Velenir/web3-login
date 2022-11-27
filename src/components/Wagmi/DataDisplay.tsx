import { useAccount, useNetwork, useBalance } from "wagmi"
import { styled } from "@linaria/react"

const AddressDisplay = styled.span`
  max-width: 12ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: bottom;
`


export const AccountData = (): JSX.Element | null => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })


  if (!isConnected) return null

  return (
    <>
      {address && <div>Address: <AddressDisplay>{address}</AddressDisplay></div>}
      {chain && <div>Connected to {chain?.name}</div>}
      {balance && <div>Balance: {balance?.formatted} {balance.symbol}</div>}
    </>
  )

  return null
}
