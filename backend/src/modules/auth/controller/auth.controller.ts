import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  perfil(@Request() req: any) {
    return this.authService.perfil(req.user.id);
  }
}