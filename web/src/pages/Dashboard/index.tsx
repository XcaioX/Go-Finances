import { Header } from '@/components/Header'
import { formatValue } from '@/util/formatValue'
import { useCallback, useState } from 'react'

import { Button } from '@/components/Button'
import { Card } from './_Card'
import { Table } from './_Table'
import { ModalCreate } from './_ModalCreate'

import { api } from '../../services/api'

import { Container, CardContainer, TableContainer } from './styles'

export interface Transaction {
  id: string
  title: string
  value: number
  formattedValue?: string
  formattedDate?: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

export interface Balance {
  income: number | string
  outcome: number | string
  total: number | string
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)
  const [showModal, setShowModal] = useState<boolean>(false)

  const createTransaction = useCallback(async (transaction: Transaction) => {
    await api.post('/transactions', transaction)
  }, [])

  const formatTransactions = useCallback(
    (transactions: Transaction[]): Transaction[] => {
      return transactions.map(transaction => ({
        ...transaction,
        formattedValus: formatValue(transaction.value),
        formattedDate: new Date(transaction.created_at).toLocaleDateString(
          'en-EN'
        )
      }))
    },
    []
  )

  const formatBalance = useCallback(
    (balance: Balance): Balance => ({
      income: formatValue(+balance.income),
      outcome: formatValue(+balance.outcome),
      total: formatValue(+balance.total)
    }),
    []
  )

  useState(() => {
    const loadTransactions = async () => {
      const response = await api.get('/transactions')
      const data = response.data.data

      const transactions = formatTransactions(data.transactions)
      const balance = formatBalance(data.balance)

      setTransactions(transactions)
      setBalance(balance)
    }

    loadTransactions()
  }, [createTransaction])

  return (
    <>
      {showModal && <ModalCreate createTransaction />}
      <Header />
      <Container>
        <CardContainer>
          <Card
            balance={balance}
            type="income"
            src="/income.svg"
            alt="Income"
          />
          <Card
            balance={balance}
            type="outcome"
            src="/outcome.svg"
            alt="Outcome"
          />
          <Card balance={balance} type="total" src="/total.svg" alt="Total" />
        </CardContainer>

        <Button onClick={() => setShowModal(!showModal)}>
          Create Transaction
        </Button>

        <TableContainer>
          <Table transactions={transactions} />
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard
