export abstract class ErrorResponseAbstract {
  errorCode: number;
  data?: any;
  message?: string;
  subCode?: string;
  subMessage?: string;
}
