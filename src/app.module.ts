import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from '../environments';
import * as process from 'process';

@Module({
  controllers: [AppController],
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
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
