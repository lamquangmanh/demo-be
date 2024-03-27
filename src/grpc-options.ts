import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // url: `localhost:${process.env.PORT}`,
    package: ['user'],
    protoPath: [
        join(__dirname, './modules/user/user.proto'),
    ],
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
