export interface OptionsInput {
  title: string;
  code: number;
  subTitle?: string;
  subCode?: number;
  data?: any;
  status?: number;
}

export class BaseException extends Error {
  constructor(message: string, options?: OptionsInput) {
    super(message);
    if (options) Object.assign(this, options);
  }
}
