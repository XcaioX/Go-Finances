import { api } from '@/services/api'
import { createContext, useCallback, useEffect, useState } from 'react'

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
  addTransactions: (transaction: TransactionData) => void
  setBalance: (balance: Balance) => void
  setShowModal: (value: boolean) => void
  deleteTransaction: (id: string) => void
}

export const transactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
)

export const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)
  const [showModal, setShowModal] = useState<boolean>(false)

  const deleteTransaction = useCallback(async (id: string) => {
    await api.delete(`/transactions/${id}`)
  }, [])

  const addTransactions = useCallback((transaction: TransactionData) => {
    setTransactions([...transactions, transaction])
  }, [])

  useEffect(() => {
    const loadTransactions = async () => {
      const response = await api.get('/transactions')
      const data = response.data.data

      const transactions = data.transactions
      const balance = data.balance

      setTransactions(transactions)
      setBalance(balance)
    }

    loadTransactions()
  }, [showModal])

  return (
    <transactionContext.Provider
      value={{
        transactions,
        addTransactions,
        deleteTransaction,
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
