export type AppEnvironment = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  PORT: number;
  CORS_ORIGIN: string[];
  APP_VERSION: string;
};

export function validateEnvironment(values: Record<string, unknown>): AppEnvironment {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'CORS_ORIGIN'];
  for (const key of required) {
    if (typeof values[key] !== 'string' || !String(values[key]).trim()) {
      throw new Error(`La variable ${key} es obligatoria`);
    }
  }
  const secret = String(values.JWT_SECRET);
  if (secret.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres');
  try {
    const databaseUrl = new URL(String(values.DATABASE_URL));
    if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) throw new Error();
  } catch {
    throw new Error('DATABASE_URL debe ser una URL PostgreSQL válida');
  }
  const origins = String(values.CORS_ORIGIN).split(',').map((origin) => origin.trim()).filter(Boolean);
  if (!origins.length) throw new Error('CORS_ORIGIN debe incluir al menos un origen');
  const expiresIn = String(values.JWT_EXPIRES_IN ?? '8h');
  if (!/^(\d+(?:\.\d+)?)(ms|s|m|h|d|w|y)$/.test(expiresIn)) {
    throw new Error('JWT_EXPIRES_IN debe ser una duración válida, por ejemplo 8h o 30m');
  }
  const port = Number(values.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT debe ser un puerto válido');
  return {
    DATABASE_URL: String(values.DATABASE_URL),
    JWT_SECRET: secret,
    JWT_EXPIRES_IN: expiresIn,
    PORT: port,
    CORS_ORIGIN: origins,
    APP_VERSION: String(values.APP_VERSION ?? 'development'),
  };
}
