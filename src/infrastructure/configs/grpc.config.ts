import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export default (config: ConfigService): GrpcOptions => ({
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${config.get('port')}`,
    package: ['users'],
    protoPath: ['user.proto'],
    loader: {
      includeDirs: [join(__dirname, '../../..', '/protos')],
    },
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
});
