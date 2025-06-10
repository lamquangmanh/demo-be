export interface LoginSuccessResponse {
  accessToken: string;
  refreshToken?: string;
}

export class VerifySuccessResponse {
  success: boolean;
}

export class GetMeSuccessResponse {
  userId?: string;
  email?: string;
  username?: string;
  avatar?: string;
  phone?: string;
  status?: string;
}
