import { join } from 'path';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

import { PROTO_PATHS, PACKAGE_NAMES } from '../constants';
import { CONFIGURATION } from './config-validation-schema';

export const configGrpc: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${CONFIGURATION.GRPC_HOST}:${CONFIGURATION.GRPC_PORT}`,
    package: PACKAGE_NAMES,
    protoPath: PROTO_PATHS,
    loader: {
      includeDirs: [
        join(
          __dirname,
          '../../../node_modules',
          '@lamquangmanh/protobuf/proto',
        ),
      ],
    },
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
