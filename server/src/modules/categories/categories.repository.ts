import { EntityRepository, Repository } from 'typeorm'

import { Category } from './models/entities/categories.entity'

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {}
