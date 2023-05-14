import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      connection: process.env.DATABASE_CONNECTION,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRETS,
  };
});
