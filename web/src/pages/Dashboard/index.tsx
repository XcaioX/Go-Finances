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

import { Container, CardContainer, TableContainer } from './styles'

const Dashboard: React.FC = () => {
  const { balance, transactions, setShowModal, showModal } = useContext(
    transactionContext
  )

  const formatTransactions = useCallback((): TransactionData[] => {
    return transactions.map(transaction => ({
      ...transaction,
      formattedValue: formatValue(transaction.value),
      formattedDate: new Date(transaction.created_at).toLocaleDateString(
        'en-EN'
      )
    }))
  }, [transactions])

  const formatBalance = useCallback(
    (): Balance => ({
      income: formatValue(+balance.income),
      outcome: formatValue(+balance.outcome),
      total: formatValue(+balance.total)
    }),
    [balance]
  )

  return (
    <>
      {showModal && <ModalCreate />}
      <Header />
      <Container>
        <CardContainer>
          <Card
            balance={formatBalance()}
            type="income"
            src="/income.svg"
            alt="Income"
          />
          <Card
            balance={formatBalance()}
            type="outcome"
            src="/outcome.svg"
            alt="Outcome"
          />
          <Card
            balance={formatBalance()}
            type="total"
            src="/total.svg"
            alt="Total"
          />
        </CardContainer>

        <Button onClick={() => setShowModal(!showModal)}>
          Create Transaction
        </Button>

        <TableContainer>
          <Table transactions={formatTransactions()} />
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard
