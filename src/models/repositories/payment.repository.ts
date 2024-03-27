import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  @InjectRepository(PaymentEntity)
  public repository: Repository<PaymentEntity>;

  async pagination() {}
}
