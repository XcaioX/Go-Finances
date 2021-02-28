import { useCallback, useContext, useEffect } from 'react'

import {
  Balance,
  transactionContext,
  TransactionData
} from '@/hooks/TransactionProvider'
import { Header } from '@/components/Header'
import { formatValue } from '@/util/formatValue'
import { Button } from '@/components/Button'
import { Card } from './_Card'
import { Table } from './_Table'
import { ModalCreate } from './_ModalCreate'
import { api } from '../../services/api'

import { Container, CardContainer, TableContainer } from './styles'

const Dashboard: React.FC = () => {
  const {
    transactions,
    setTransactions,
    setBalance,
    balance,
    setShowModal,
    showModal
  } = useContext(transactionContext)

  const formatTransactions = useCallback(
    (transactions: TransactionData[]): TransactionData[] => {
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

  useEffect(() => {
    const loadTransactions = async () => {
      const response = await api.get('/transactions')
      const data = response.data.data

      const transactions = formatTransactions(data.transactions)
      const balance = formatBalance(data.balance)

      setTransactions(transactions)
      setBalance(balance)
    }

    loadTransactions()
  }, [setShowModal, setTransactions])

  return (
    <>
      {showModal && <ModalCreate />}
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
          <Table />
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard
