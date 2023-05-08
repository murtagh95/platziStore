import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    return `Hello World! With api_key => ${this.configService.apiKey} and database => ${this.configService.database.name}`;
  }

  geTasks() {
    return this.tasks;
  }
}
