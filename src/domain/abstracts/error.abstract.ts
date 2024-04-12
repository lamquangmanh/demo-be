export abstract class ErrorResponseAbstract {
  code: number;
  data?: any;
  message?: string;
  subCode?: string;
  subMessage?: string;
}
