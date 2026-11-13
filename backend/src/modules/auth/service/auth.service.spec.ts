import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

describe('AuthService.login', () => {
  const prisma = { usuario: { findUnique: jest.fn() } };
  const jwt = { sign: jest.fn().mockReturnValue('signed-token') };
  const service = new AuthService(prisma as any, jwt as any);

  beforeEach(() => jest.clearAllMocks());

  it('emite un JWT y devuelve datos del usuario sin la contraseña', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 1, nombre: 'Admin', email: 'admin@example.test', rol: 'ADMINISTRADOR', password: awaitHash });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    await expect(service.login({ email: 'admin@example.test', password: 'clave' })).resolves.toEqual({
      access_token: 'signed-token',
      usuario: { id: 1, nombre: 'Admin', email: 'admin@example.test', rol: 'ADMINISTRADOR' },
    });
    expect(jwt.sign).toHaveBeenCalledWith(expect.objectContaining({ sub: 1, rol: 'ADMINISTRADOR' }));
  });

  it('rechaza credenciales inválidas', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: 'x@example.test', password: 'mal' })).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

const awaitHash = '$2a$10$C6UzMDM.H6dfI/f/IKcEe.1y2Yq.8K0z3x5nQJ6Z0vH2N7Q0d9V2K';
