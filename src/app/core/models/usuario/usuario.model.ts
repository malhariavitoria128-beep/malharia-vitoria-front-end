export interface Usuario {
  userId: string,
  email: string;
  createdAt: Date;
  nome: string;
  role: string;
  isApproved: boolean;
}
