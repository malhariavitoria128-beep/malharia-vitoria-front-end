export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  details?: string;
  data: T | null;
}
