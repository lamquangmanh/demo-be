import { ErrorResponseAbstract } from '@domain/abstracts';
import { RpcException } from '@nestjs/microservices';

export const ErrorResponse = ({
  code,
  ...rest
}: ErrorResponseAbstract): RpcException => {
  return new RpcException({ code, ...rest });
};
