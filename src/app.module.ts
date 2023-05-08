import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
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

@Module({
  controllers: [AppController],
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.ir/todos');
        const task = await lastValueFrom(request);
        return task.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
