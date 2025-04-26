import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import from domain
import { ActionEntity } from '../entities';

// import from infrastructure
import { BaseRepository } from './base.repository';

@Injectable()
export class ActionRepository extends BaseRepository<ActionEntity> {
  constructor(
    @InjectRepository(ActionEntity)
    repository: Repository<ActionEntity>,
  ) {
    super(repository);
  }
}
