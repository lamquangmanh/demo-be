import { ErrorResponseAbstract } from '@domain/abstracts';
import { RpcException } from '@nestjs/microservices';

export const ErrorResponse = ({
  errorCode,
  ...rest
}: ErrorResponseAbstract): RpcException => {
  return new RpcException({ errorCode, ...rest });
};
