import { apiPost } from '../lib/api';

export interface LoginResponse {
  access_token: string;
  usuario: {
    id: number;
    nombre: string;
    email: string;
    rol: 'ADMINISTRADOR' | 'CHEF' | 'BODEGA';
  };
}

export function login(email: string, password: string) {
  return apiPost<LoginResponse>('/auth/login', { email, password });
}
