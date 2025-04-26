import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import from domain
import { ResourceEntity } from '../entities';

// import from infrastructure
import { BaseRepository } from './base.repository';

@Injectable()
export class ResourceRepository extends BaseRepository<ResourceEntity> {
  constructor(
    @InjectRepository(ResourceEntity)
    repository: Repository<ResourceEntity>,
  ) {
    super(repository);
  }
}
