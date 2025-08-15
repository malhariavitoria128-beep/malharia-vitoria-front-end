
export interface LoginResquest {
  email: string;
  password: string;
}

export interface RegisterResquest {
  nome: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UsuarioAutenticado {
  id: string;
  email: string;
  roles: string[];
  isApproved: boolean;
}

export interface NewPassword {
  newPassword: string
}

export interface JwtPayload {
  sub: string;
  email: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string | string[];
  is_approved: string;
}
