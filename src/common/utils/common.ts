import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

// export function userHasPermission(
//   // user: User,
//   user: any,
//   action: string,
//   resource: string,
// ): boolean {
//   for (const role of user.roles) {
//     for (const permission of role.permissions) {
//       if (permission.action === action && permission.resource === resource) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

interface ErrorItem {
  property: string;
  constraints: string[];
}
export const formatErrors = (errors: any[]): ErrorItem[] => {
  const result: ErrorItem[] = [];

  for (const error of errors) {
    if (error.constraints) {
      result.push({
        property: error.property,
        constraints: Object.values(error.constraints).map(
          (value: string) => value,
        ),
      });
    }

    if (error.children?.length) {
      result.push(...formatErrors(error.children));
    }
  }

  return result;
};

/**
 * Logic: validate dto with the data
 * @param data
 * @param dto
 * @returns
 */
export const validateDto = async (data: any, dto: any): Promise<any> => {
  try {
    const dtoInstance = plainToInstance(dto, data);
    await validateOrReject(dtoInstance);
    return dtoInstance;
  } catch (errors) {
    const errorList = formatErrors(errors as ValidationError[]);
    const error = {
      code: status.INVALID_ARGUMENT,
      message: 'Invalid Arguments',
      extra: { errorList },
    };
    throw new RpcException({
      code: error.code,
      message: JSON.stringify(error),
    });
  }
};
