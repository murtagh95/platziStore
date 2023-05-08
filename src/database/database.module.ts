import { Module, Global } from '@nestjs/common';
import * as process from 'process';
import { MongoClient } from 'mongodb';

const API_KEY = '12341234';
const API_KEY_PROD = 'PROD12341234';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const URI =
          'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(URI);
        await client.connect();
        return client.db('platzi-store');
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
