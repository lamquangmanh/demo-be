/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { GrpcContextAbstract } from 'src/domain/abstracts/grpcContext.abstract';
import { SAMPLE_USECASE } from 'src/domain/common/useCaseName/sample';
import { ClientGRPCModule } from 'src/infrastructure/grpc/clientGRPC.module';
import { AddSampleUseCase, GetSampleUseCase } from 'src/useCases/sample';

@Module({
  imports: [ClientGRPCModule],
})
export class SampleProxyModule {
  static register() {
    return {
      module: SampleProxyModule,
      providers: [
        {
          inject: [GrpcContextAbstract],
          provide: SAMPLE_USECASE.GET_SAMPLE,
          useFactory: (...args: [GrpcContextAbstract]) => new GetSampleUseCase(),
        },
        {
          inject: [GrpcContextAbstract],
          provide: SAMPLE_USECASE.ADD_SAMPLE,
          useFactory: (...args: [GrpcContextAbstract]) => new AddSampleUseCase(),
        },
      ],
      exports: [SAMPLE_USECASE.GET_SAMPLE, SAMPLE_USECASE.ADD_SAMPLE],
    };
  }
}
