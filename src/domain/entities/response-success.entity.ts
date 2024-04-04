export class IResponseSuccess<T> {
  constructor(params: any) {
    Object.assign(this, params);
  }
  total: number = 0;
  data: T;
}
