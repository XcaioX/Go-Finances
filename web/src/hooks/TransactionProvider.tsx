import { createContext, useCallback, useState } from 'react'

export type TransactionData = {
  id: string
  title: string
  value: number
  formattedValue?: string
  formattedDate?: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

export type Balance = {
  income: number | string
  outcome: number | string
  total: number | string
}

type TransactionContextData = {
  transactions: TransactionData[]
  balance: Balance
  showModal: boolean
  setTransactions: (transaction: TransactionData[]) => void
  setBalance: (balance: Balance) => void
  setShowModal: (value: boolean) => void
}

export const transactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
)

export const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <transactionContext.Provider
      value={{
        transactions,
        setTransactions,
        balance,
        setBalance,
        showModal,
        setShowModal
      }}
    >
      {children}
    </transactionContext.Provider>
  )
}
