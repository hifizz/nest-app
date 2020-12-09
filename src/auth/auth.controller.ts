import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';

@Controller('/api/auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(userDto: CreateUserDto) {
    return { login: true }
  }

  @Get('/logout')
  public async logout(userDto: CreateUserDto) {

  }

  @Get('/register')
  public async register(userDto: CreateUserDto) {

  }
}
