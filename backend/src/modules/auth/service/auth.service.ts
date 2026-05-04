import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        password: hashedPassword,
        rol: dto.rol,
      },
    });

    const { password, ...result } = usuario;
    return result;
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  async perfil(userId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    const { password, ...result } = usuario;
    return result;
  }
}