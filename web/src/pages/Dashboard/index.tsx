import { Header } from '@/components/Header'
import { formatValue } from '@/util/formatValue'
import { useCallback, useState } from 'react'

import { Button } from '@/components/Button'

import { api } from '../../services/api'

import { Container, CardContainer, TableContainer, Card } from './styles'

interface Transaction {
  id: string
  title: string
  value: number
  formattedValue?: string
  formattedDate?: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

interface Balance {
  income: number | string
  outcome: number | string
  total: number | string
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)
  const [showModal, setShowModal] = useState<boolean>(false)

  const createTransaction = useCallback(async (transaction: Transaction) => {
    const response = await api.post('/transactions', transaction)
    const data = response.data.data
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
      income: formatValue(balance.income as number),
      outcome: formatValue(balance.outcome as number),
      total: formatValue(balance.total as number)
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
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Income</p>
              <img src="/income.svg" alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>

          <Card>
            <header>
              <p>Outcome</p>
              <img src="/outcome.svg" alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>

          <Card>
            <header>
              <p>Total</p>
              <img src="/total.svg" alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <Button onClick={() => setShowModal(!showModal)}>Create</Button>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className="income">{transaction.formattedValue}</td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard
