import { RpcException } from '@nestjs/microservices';

export class GrpcCustomException extends RpcException {
  constructor(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super({ ...data, message: JSON.stringify(data) });
  }
}
