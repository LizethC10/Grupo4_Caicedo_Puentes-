const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function requestHeaders(jsonBody = false): HeadersInit {
  const headers: Record<string, string> = {};

  if (jsonBody) headers['Content-Type'] = 'application/json';

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

async function handleResponse<T>(res: Response, method: string, path: string): Promise<T> {
  if (res.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    if (window.location.pathname !== '/login') window.location.assign('/login');
  }

  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);

  const json = await res.json();
  return json.data as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    headers: requestHeaders(),
  });
  return handleResponse<T>(res, 'GET', path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method: 'POST',
    headers: requestHeaders(true),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res, 'POST', path);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method: 'PUT',
    headers: requestHeaders(true),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res, 'PUT', path);
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method: 'DELETE',
    headers: requestHeaders(),
  });
  return handleResponse<T>(res, 'DELETE', path);
}
