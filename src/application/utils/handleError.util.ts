import { ErrorResponseAbstract } from '@domain/abstracts';

export const ErrorResponse = ({ errorCode, ...rest }: ErrorResponseAbstract): ErrorResponseAbstract => {
  return { errorCode, ...rest };
};
