import { Transaction } from '../index'

import { Container } from './styles'

interface TableProps {
  transactions: Transaction[]
}

export const Table: React.FC<TableProps> = ({ transactions }) => {
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
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td className="title">{transaction.title}</td>
            <td className={transaction.type}>{transaction.formattedValue}</td>
            <td>{transaction.category.title}</td>
            <td>{transaction.formattedDate}</td>
          </tr>
        ))}
      </tbody>
    </Container>
  )
}
