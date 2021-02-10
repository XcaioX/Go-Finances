import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'
import { TransactionType } from '../enums/transaction-type.enum'

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType

  @IsOptional()
  @IsString()
  category: string
}
