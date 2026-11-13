import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '../auth/decorators/public.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  @Public()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', version: this.config.get<string>('APP_VERSION', 'development') };
    } catch {
      throw new ServiceUnavailableException({ status: 'error', version: this.config.get<string>('APP_VERSION', 'development') });
    }
  }
}
