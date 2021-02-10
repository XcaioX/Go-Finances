import { Transaction } from './entities/transactions.entity'

export interface TotalBalance {
  income: number
  outcome: number
  total: number
}

export interface RetrieveTransactions {
  transactions: Transaction[]
  balance: TotalBalance
}
