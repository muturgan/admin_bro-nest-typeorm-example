import { Module } from '@nestjs/common';
import { AdminModule } from '@admin-bro/nestjs';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';

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
        synchronize: true,
        logging: false,
      }),
    AdminModule.createAdminAsync({
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
      ],
      inject: [
        getRepositoryToken(UserEntity),
      ],
      useFactory: (userRepository: Repository<UserEntity>) => ({
        adminBroOptions: {
          rootPath: '/admin',
          resources: [
            { resource: userRepository },
          ],
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