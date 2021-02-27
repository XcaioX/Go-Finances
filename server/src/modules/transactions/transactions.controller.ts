import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  // UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
// import { JwtAuthGuard } from 'shared/modules/auth/guards/jwt.guard'
import { CreateTransactionDTO } from './models/dtos/create-transaction.dto'
import { Transaction } from './models/entities/transactions.entity'

import { RetrieveTransactions } from './models/total-balance'
import { TransactionsService } from './transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<RetrieveTransactions> {
    return this.transactionsService.findAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.findOne(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() payload: CreateTransactionDTO): Promise<Transaction> {
    return this.transactionsService.create(payload)
  }

  // @UseGuards(JwtAuthGuard)
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async createManyFromFile(@UploadedFile() file): Promise<Transaction[]> {
    return this.transactionsService.createManyFromFile(file.path)
  }
}
