import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }

  // @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Public()
  @Get('/tasks/')
  hello() {
    return this.appService.geTasks();
  }
}
