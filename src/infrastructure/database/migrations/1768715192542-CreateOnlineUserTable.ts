import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOnlineUserTable1768715192542 implements MigrationInterface {
  name = 'CreateOnlineUserTable1768715192542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "online_users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "online_user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "socket_id" character varying(50) NOT NULL, "device_info" character varying(500), "current_page_url" character varying(500), CONSTRAINT "UQ_online_users_user_id_socket_id" UNIQUE ("user_id", "socket_id"), CONSTRAINT "PK_online_user_id" PRIMARY KEY ("online_user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "online_users" ADD CONSTRAINT "FK_online_user_to_user" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "online_users" DROP CONSTRAINT "FK_online_user_to_user"`,
    );
    await queryRunner.query(`DROP TABLE "online_users"`);
  }
}
