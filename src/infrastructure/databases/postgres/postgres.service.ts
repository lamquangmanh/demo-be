import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseContextAbstract } from '@domain/abstracts';
import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { IUser } from '@src/domain/entities';

@Injectable()
export class PostgresService implements DatabaseContextAbstract, OnApplicationBootstrap {
  readonly queryRunner: QueryRunner;
  readonly manager: EntityManager;

  user: UserRepository;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<IUser>,
    private dataSource: DataSource,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.manager = this.queryRunner.manager;
  }

  onApplicationBootstrap() {
    this.user = new UserRepository(this.userRepository);
  }

  async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    return await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    return await this.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    return await this.queryRunner.rollbackTransaction();
  }

  async releaseTransaction(): Promise<void> {
    return await this.queryRunner.release();
  }

  async transaction<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> {
    return await this.dataSource.manager.transaction(callback);
  }
}
