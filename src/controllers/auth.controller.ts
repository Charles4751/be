import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../data-transfer-object/create-user.dto'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(
    @Body() loginData: { phoneNumber: number; password: string },
  ) {
    // 调用 AuthService 中的登录方法
    const user = await this.authService.login(
      loginData.phoneNumber,
      loginData.password,
    );
    return user;
  }

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto) {
    // 调用 AuthService 中的注册方法
    const user = await this.authService.register(userData);
    return user;
  }
}
