import { useContext } from 'react'

import { CloseItem } from '@/components/CloseItem/styles'
import { transactionContext, TransactionData } from '@/hooks/TransactionContext'
import { Container } from './styles'

type TableProps = {
  transactions: TransactionData[]
}

export const Table: React.FC<TableProps> = ({ transactions }) => {
  const { deleteTransaction } = useContext(transactionContext)

  return (
    <Container>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Data</th>
        </tr>
      </thead>

      <tbody>
        {transactions &&
          transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="title">{transaction.title}</td>
              <td className={transaction.type.toLowerCase()}>
                {transaction.formattedValue}
              </td>
              <td>{transaction.category?.title}</td>
              <td>{transaction.formattedDate}</td>
              <CloseItem onClick={() => deleteTransaction(transaction.id)} />
            </tr>
          ))}
      </tbody>
    </Container>
  )
}
