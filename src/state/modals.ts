import { useCallback } from 'react'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type ModalType = "CONNECT"

interface ModalState {
  modal: ModalType | null
  setModal(modal: ModalType): void
  close(): void
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set) => ({
      modal: null,
      setModal: (modal) => set({ modal }),
      close: () => set({ modal: null })
    })
  )
)

export const useCurrentModal = () => useModalStore(state => state.modal)

export const useOpenConnectModal = () => {
  const setModal = useModalStore(state => state.setModal)
  return useCallback(() => setModal("CONNECT"), [setModal])
}

export const useCloseModal = () => useModalStore(state => state.close)