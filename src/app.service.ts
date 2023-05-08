import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private api_key: string) {}
  getHello(): string {
    return `Hello World! With api_key => ${this.api_key}`;
  }
}
