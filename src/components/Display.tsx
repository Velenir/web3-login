import { Column } from "../Layout/Column"
import { GetBalance, GetChainId, LogIn, LogOut, SendTx } from "./Controls"
import { AccountData } from "./Wagmi/DataDisplay"

import { useAccount } from "wagmi"

const ConnectedDisplay = (): JSX.Element => {
  return <Column>
    <AccountData />
    <GetChainId />
    <GetBalance />
    <SendTx />
    <LogOut />
  </Column>

}

const DisconnectedDisplay = (): JSX.Element => {
  return <Column>
    <LogIn />
  </Column>
}

export const Web3Display = (): JSX.Element => {
  const { isConnected } = useAccount()

  return isConnected ? <ConnectedDisplay /> : <DisconnectedDisplay />
}