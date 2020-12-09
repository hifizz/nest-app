import { Controller, Get, UseInterceptors, Inject } from '@nestjs/common';
import { User } from './User.entity';
import { UserService } from './User.service';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';

@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(id: number) {
    return await this.userService.findById(id);
  }

  @Get('/profile')
  async getProfile(id: number) {
    return await this.userService.getProfile(id);
  }
}
