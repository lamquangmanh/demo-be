import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateModuleEntity1749472630164 implements MigrationInterface {
  name = 'UpdateModuleEntity1749472630164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "modules" ADD "url" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_status_enum" RENAME TO "users_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DEACTIVATED', 'DELETED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum" USING "status"::"text"::"public"."users_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum_old" AS ENUM('ACTIVE', 'DEACTIVATE', 'DELETED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum_old" USING "status"::"text"::"public"."users_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."users_status_enum_old" RENAME TO "users_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "url"`);
  }
}
