import { Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { join } from 'path';

export default {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${process.env.PORT}`,
    package: ['users'],
    protoPath: ['user.proto'],
    loader: {
      includeDirs: [join(__dirname, '../../..', '/protos')],
    },
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
