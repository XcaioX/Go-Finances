import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../../shared/modules/auth/auth.module'
import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard, UserIsUser],
  exports: [UsersService]
})
export class UsersModule {}
