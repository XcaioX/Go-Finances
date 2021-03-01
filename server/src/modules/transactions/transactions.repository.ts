import { EntityRepository, Repository } from 'typeorm'

import { Transaction } from './models/entities/transactions.entity'
import { TotalBalance } from './models/total-balance'

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  async getBalance(): Promise<TotalBalance> {
    const transactions = await this.find()

    const balance = {
      income: 0,
      outcome: 0,
      total: 0
    }

    transactions.map(transaction => {
      return (balance[transaction.type.toLocaleLowerCase()] += Number(
        transaction.value
      ))
    })

    balance.total = balance.income - balance.outcome
    return balance
  }
}
