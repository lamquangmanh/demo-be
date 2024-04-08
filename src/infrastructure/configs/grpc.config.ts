import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { join } from 'path';

console.log('path: ', join(__dirname, '../', '/protos'));
export default (): GrpcOptions => ({
  transport: Transport.GRPC,
  options: {
    url: `localhost:${process.env.GRPC_PORT}`,
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
