/* eslint-disable eqeqeq */
/* eslint-disable node/no-path-concat */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoriesModule } from './modules/categories/categories.module'
import { TransactionModule } from './modules/transactions/transactions.module'
import authConfig from './config/auth.config'
import { nosqlDatabase, sqlDatabase } from './config/database.config'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './shared/modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [sqlDatabase, nosqlDatabase, authConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        name: configService.get('sqlDatabase.name'),
        host: configService.get('sqlDatabase.host'),
        port: configService.get('sqlDatabase.port'),
        username: configService.get('sqlDatabase.username'),
        password: configService.get('sqlDatabase.password'),
        database: configService.get('sqlDatabase.database'),
        entities: [__dirname + '/../dist/modules/**/models/entities/*.js'],
        synchronize: true,
        autoLoadEntities: true,
        keepConnectionAlive: true
      })
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    TransactionModule
  ]
})
export class AppModule {}
