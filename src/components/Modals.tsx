import { useConnect } from "wagmi"
import { Column } from "../Layout/Column"
import { Modal, ModalContextProps } from "../Layout/Modal"
import { ModalType, useCloseModal, useCurrentModal } from "../state/modals"
import { Button } from "./Button"

const ConnectWallet = ({ closeModal }: ModalContextProps): JSX.Element => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({ onSuccess: closeModal })

  return (
    <Column>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {/* {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'} */}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </Column>
  )
}

const ModalsByType: Record<ModalType, (props: ModalContextProps) => JSX.Element> = {
  CONNECT: ConnectWallet
}

export const Modals = (): JSX.Element | null => {
  const modal = useCurrentModal()
  const closeModal = useCloseModal()

  if (!modal) return null

  const Comp = ModalsByType[modal]
  return <Modal open>
    <Comp closeModal={closeModal} />
  </Modal>
}