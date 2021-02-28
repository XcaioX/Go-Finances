import { TransactionProvider } from './TransactionProvider'

const ContextProvider: React.FC = ({ children }) => {
  return <TransactionProvider>{children}</TransactionProvider>
}

export default ContextProvider
