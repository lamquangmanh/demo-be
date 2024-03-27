import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5001',
    package: ['hero'],
    protoPath: [
      join(__dirname, './hero/hero.proto'),
    ],
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
