import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In } from 'typeorm'

import { CategoriesRepository } from './categories.repository'
import { Category } from './models/entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  async findCategories(categories: string | string[]): Promise<Category[]> {
    if (!Array.isArray(categories)) categories = [categories]

    return this.categoriesRepository.find({
      where: { title: In(categories) }
    })
  }

  async createCategories(categories: string | string[]): Promise<Category[]> {
    if (!Array.isArray(categories)) categories = [categories]

    const newCategories = this.categoriesRepository.create(
      categories.map(category => ({
        title: category
      }))
    )
    return this.categoriesRepository.save(newCategories)
  }
}
