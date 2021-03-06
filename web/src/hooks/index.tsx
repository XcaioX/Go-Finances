import { TransactionProvider } from './TransactionContext'

const ContextProvider: React.FC = ({ children }) => {
  return <TransactionProvider>{children}</TransactionProvider>
}

export default ContextProvider
