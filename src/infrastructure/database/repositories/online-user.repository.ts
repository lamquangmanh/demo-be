import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import from domain
import { OnlineUserEntity } from '../entities';

// import from infrastructure
import { BaseRepository } from './base.repository';

@Injectable()
export class OnlineUserRepository extends BaseRepository<OnlineUserEntity> {
  constructor(
    @InjectRepository(OnlineUserEntity)
    repository: Repository<OnlineUserEntity>,
  ) {
    super(repository);
  }
}
