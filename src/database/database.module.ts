import { Module, Global } from '@nestjs/common';
import * as process from 'process';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../../config';

const API_KEY = '12341234';
const API_KEY_PROD = 'PROD12341234';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, name } =
          configService.database;
        return {
          uri: `${connection}://${host}:${port}/?authMechanism=DEFAULT`,
          user: username,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, name } =
          configService.database;
        const URI = `${connection}://${username}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(URI);
        await client.connect();
        return client.db(name);
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
