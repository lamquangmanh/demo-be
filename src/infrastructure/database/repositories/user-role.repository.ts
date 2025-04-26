import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import from domain
import { UserRoleEntity } from '../entities';

// import from infrastructure
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {
  constructor(
    @InjectRepository(UserRoleEntity)
    repository: Repository<UserRoleEntity>,
  ) {
    super(repository);
  }
}
