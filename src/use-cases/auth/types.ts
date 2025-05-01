export interface LoginSuccessResponse {
  accessToken: string;
  refreshToken?: string;
}

export class VerifySuccessResponse {
  success: boolean;
}
