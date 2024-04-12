export class IResponseError {
  constructor(params: any) {
    Object.assign(this, params);
  }
  type?: string;
  code: number;
  subCode?: number;
  subTitle?: string;
  message: string;
  name?: string;
  data?: any;
}
