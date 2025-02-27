import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, senha }: { email: string; senha: string }) {
    const user = await this.authService.validateUser(email, senha);
    return this.authService.login(user);
  }
}
