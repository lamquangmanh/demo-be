import { Global, Module } from '@nestjs/common';
import { SampleProxyModule } from './sample/sampleProxy.module';
import { ClientGRPCModule } from '../grpc/clientGRPC.module';

const SampleUseCaseProxyModule = SampleProxyModule.register();

@Global()
@Module({
  imports: [ClientGRPCModule, SampleUseCaseProxyModule],
  exports: [SampleUseCaseProxyModule],
})
export class UseCaseProxyModule {}
