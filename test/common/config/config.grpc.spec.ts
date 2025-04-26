import { Transport } from '@nestjs/microservices';
import { join } from 'path';

import { configGrpc } from '../../../src/common/configs/config-grpc';
import { ReflectionService } from '@grpc/reflection';

jest.mock('@grpc/reflection', () => ({
  ReflectionService: jest.fn().mockImplementation(() => ({
    addToServer: jest.fn(),
  })),
}));

describe('configGrpc', () => {
  it('should have the correct transport type', () => {
    expect(configGrpc.transport).toBe(Transport.GRPC);
  });

  it('should have the correct URL', () => {
    const expectedUrl = `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`;
    expect(configGrpc.options.url).toBe(expectedUrl);
  });

  it('should include the correct package names', () => {
    const expectedPackages = ['user.v1', 'action.v1']; // Replace with actual package names
    expectedPackages.forEach((pkg) => {
      expect(configGrpc.options.package).toContain(pkg);
    });
  });

  it('should include the correct proto paths', () => {
    const expectedProtoPaths = ['user/v1/user.proto', 'action/v1/action.proto']; // Replace with actual proto paths
    expectedProtoPaths.forEach((pathString) => {
      expect(configGrpc.options.protoPath).toContain(pathString);
    });
  });

  it('should include the correct loader includeDirs', () => {
    const expectedIncludeDirs = join(
      __dirname,
      '../../../node_modules/@lamquangmanh/protobuf/proto',
    );
    expect(configGrpc.options.loader?.includeDirs).toContain(
      expectedIncludeDirs,
    );
  });

  it('should call ReflectionService in onLoadPackageDefinition', () => {
    const mockPkg = {};
    const mockServer = {
      addService: jest.fn(),
    };
    // Use optional chaining to safely invoke onLoadPackageDefinition
    configGrpc.options.onLoadPackageDefinition?.(mockPkg, mockServer);

    // Verify that ReflectionService was instantiated
    expect(ReflectionService).toHaveBeenCalled();
  });
});
