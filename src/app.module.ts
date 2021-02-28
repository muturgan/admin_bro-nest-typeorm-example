import { Module } from '@nestjs/common';
import { AdminModule } from '@admin-bro/nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';
import { ProductEntity } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'database_test',
        entities: [UserEntity, ProductEntity],
        synchronize: true,
        logging: false,
      }),
    AdminModule.createAdminAsync({
      inject: [Connection],
      useFactory: (conn: Connection) => ({
        adminBroOptions: {
          rootPath: '/admin',
          databases: [conn],
        },
        auth: {
          authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }