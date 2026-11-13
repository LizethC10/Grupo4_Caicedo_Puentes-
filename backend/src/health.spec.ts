import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

describe('Health and authentication (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
  });

  afterAll(async () => app?.close());

  it('reports a healthy database and the running version', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    expect(response.body.data).toEqual({ status: 'ok', version: expect.any(String) });
  });

  it('rejects protected inventory routes without a token', async () => {
    await request(app.getHttpServer()).get('/api/v1/insumos').expect(401);
  });
});
