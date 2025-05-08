import { RpcException } from '@nestjs/microservices';

export class GrpcCustomException extends RpcException {
  constructor(data: any) {
    super({ ...data, message: JSON.stringify(data) });
  }
}
