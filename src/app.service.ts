import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    const api_key = this.configService.get<string>('API_KEY');
    return `Hello World! With api_key => ${api_key}`;
  }

  geTasks() {
    return this.tasks;
  }
}
