import { Module } from '@nestjs/common';
// import { HttpModule, HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { environments } from '../environments';
import config from '../config';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRETS: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_CONNECTION: Joi.string().required(),
        SERVER_PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
