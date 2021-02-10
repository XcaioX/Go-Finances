import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import csvParse from 'csv-parse'
import fs from 'fs'

import { CreateTransactionDTO } from './models/dtos/create-transaction.dto'
import { Transaction } from './models/entities/transactions.entity'

import { TransactionsRepository } from './transactions.repository'
import { CategoriesService } from 'modules/categories/categories.service'
import { RetrieveTransactions } from './models/total-balance'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly transactionsRepository: TransactionsRepository,

    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService
  ) {}

  async findAll(): Promise<RetrieveTransactions> {
    const transactions = await this.transactionsRepository.find()
    const balance = await this.transactionsRepository.getBalance()
    return { transactions, balance }
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = this.transactionsRepository.findOne(id)

    if (!transaction) {
      throw new NotFoundException('Transaction could not be found!')
    }

    return transaction
  }

  async create(payload: CreateTransactionDTO): Promise<Transaction> {
    let category = await this.categoriesService.findCategories(payload.category)

    if (!category) {
      category = await this.categoriesService.createCategories(payload.category)
    }

    const transaction = this.transactionsRepository.create({
      ...payload,
      category: category[0]
    })
    return this.transactionsRepository.save(transaction)
  }

  async createManyFromFile(filePath: string): Promise<Transaction[]> {
    const contactsReadbleStream = fs.createReadStream(filePath)

    const parsers = csvParse({
      from_line: 2
    })

    const parseCSV = contactsReadbleStream.pipe(parsers)

    const transactions: CreateTransactionDTO[] = []
    const categories: string[] = []

    parseCSV.on('data', async line => {
      const [title, value, type, category] = line.map((cell: string) =>
        cell.trim()
      )

      if (!title || !value || !type) return

      transactions.push({ title, value, type, category })
      categories.push(category)
    })

    // eslint-disable-next-line promise/param-names
    await new Promise(r => parseCSV.on('end', r))

    const existingCategories = await this.categoriesService.findCategories(
      categories
    )

    const existingCategoriesTitles = existingCategories.map(
      category => category.title
    )

    const categoriesToBeAdded = categories
      .filter(category => !existingCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates

    const newCategories = await this.categoriesService.createCategories(
      categoriesToBeAdded
    )

    const allCategories = [...newCategories, ...existingCategories]

    const newTransactions = this.transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        category: allCategories.find(
          category => category.title === transaction.category
        )
      }))
    )

    try {
      await fs.promises.unlink(filePath)
      return this.transactionsRepository.save(newTransactions)
    } catch (error) {
      throw new PreconditionFailedException(error)
    }
  }
}
