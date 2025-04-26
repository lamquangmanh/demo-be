import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import from domain
import { ModuleEntity } from '../entities';

// import from infrastructure
import { BaseRepository } from './base.repository';

@Injectable()
export class ModuleRepository extends BaseRepository<ModuleEntity> {
  constructor(
    @InjectRepository(ModuleEntity)
    repository: Repository<ModuleEntity>,
  ) {
    super(repository);
  }
}
