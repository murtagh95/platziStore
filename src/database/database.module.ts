import { Module, Global } from '@nestjs/common';
import * as process from 'process';

const API_KEY = '12341234';
const API_KEY_PROD = 'PROD12341234';
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
