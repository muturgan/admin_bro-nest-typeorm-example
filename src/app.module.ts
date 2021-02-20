import { Module } from '@nestjs/common';
import { AdminModule } from '@admin-bro/nestjs';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'database_test',
        entities: [UserEntity],
        synchronize: false,
        logging: false,
      }),
    AdminModule.createAdminAsync({
      imports: [
        UserModule,
      ],
      inject: [
        getRepositoryToken(UserEntity),
      ],
      useFactory: (userModel: UserEntity) => ({
        adminBroOptions: {
          rootPath: '/admin',
          resources: [
            { resource: userModel },
          ],
        },
        auth: {
          authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }