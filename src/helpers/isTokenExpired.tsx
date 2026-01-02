import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);

    if (!decoded.exp) return true;

    const expiration = decoded.exp * 1000;
    return Date.now() > expiration;

  } catch (error) {
    return true; // Cualquier error => token inválido
  }
}