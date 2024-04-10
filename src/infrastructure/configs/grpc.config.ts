import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { join } from 'path';
import { LogLevel, LoggerService } from '@nestjs/common';

export default (): GrpcOptions & {
  logger: false | LoggerService | LogLevel[];
} => ({
  logger: false,
  transport: Transport.GRPC,
  options: {
    url: `localhost:${process.env.PORT}`,
    package: ['users'],
    protoPath: ['user.proto'],
    loader: {
      includeDirs: [join(__dirname, '../', '/protos')],
    },
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
});
