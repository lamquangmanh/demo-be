import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

import { PROTO_PATHS, PACKAGE_NAMES } from '../constants';

export const configGrpc = {
  transport: Transport.GRPC,
  options: {
    package: PACKAGE_NAMES,
    protoPath: PROTO_PATHS,
    // protoPath: PROTO_PATHS.map((path) => () => {
    //   return join(__dirname, '', path);
    // }),
    includeDirs: [join(__dirname, '../infrastructure/grpc/protos')],
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
