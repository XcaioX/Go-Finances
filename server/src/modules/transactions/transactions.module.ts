import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoriesModule } from '../../modules/categories/categories.module'
import { TransactionsController } from './transactions.controller'
import { TransactionsRepository } from './transactions.repository'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionsRepository]),
    MulterModule.register({
      // eslint-disable-next-line node/no-path-concat
      dest: __dirname + '/../../../tmp'
    }),
    CategoriesModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionModule {}
