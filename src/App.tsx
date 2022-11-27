import {  Web3Display } from './components/Display'
import "./styles/global"
import { RootContainer } from './Layout/Root'
import { WagmiProvider } from './components/Wagmi/Provider'
import { Modals } from './components/Modals'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <RootContainer>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>

          <Modals />
          <h1>Web3 App</h1>
          <Web3Display />
        </WagmiProvider>
      </QueryClientProvider>
    </RootContainer>
  )
}

export default App
