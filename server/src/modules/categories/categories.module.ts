import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoriesService } from './categories.service'
import { CategoriesRepository } from './categories.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
