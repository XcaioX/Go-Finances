import { Category } from 'modules/categories/models/entities/categories.entity'
import { TransactionType } from 'modules/transactions/models/enums/transaction-type.enum'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('transaction')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType

  @Column({ nullable: true })
  category_id?: string

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
