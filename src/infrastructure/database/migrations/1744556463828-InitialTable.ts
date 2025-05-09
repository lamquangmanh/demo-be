import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTable1744556463828 implements MigrationInterface {
  name = 'InitialTable1744556463828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "actions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "action_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resource_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255), "request_type" character varying(20) NOT NULL, "url" character varying(255) NOT NULL, "method" character varying(100) NOT NULL, CONSTRAINT "PK_action_id" PRIMARY KEY ("action_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_deleted_at_idx" ON "actions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_updated_at_idx" ON "actions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_created_at_idx" ON "actions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_deleted_user_id_idx" ON "actions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_updated_user_id_idx" ON "actions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_created_user_id_idx" ON "actions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "modules" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "module_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255), CONSTRAINT "PK_module_id" PRIMARY KEY ("module_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_deleted_at_idx" ON "modules" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_updated_at_idx" ON "modules" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_created_at_idx" ON "modules" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_deleted_user_id_idx" ON "modules" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_updated_user_id_idx" ON "modules" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_created_user_id_idx" ON "modules" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "resources" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "resource_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "module_id" uuid NOT NULL, CONSTRAINT "PK_resource_id" PRIMARY KEY ("resource_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_deleted_at_idx" ON "resources" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_updated_at_idx" ON "resources" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_created_at_idx" ON "resources" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_deleted_user_id_idx" ON "resources" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_updated_user_id_idx" ON "resources" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_created_user_id_idx" ON "resources" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "permission_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_id" uuid NOT NULL, "resource_id" uuid NOT NULL, "action_id" uuid NOT NULL, CONSTRAINT "PK_permission_id" PRIMARY KEY ("permission_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_deleted_at_idx" ON "permissions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_updated_at_idx" ON "permissions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_created_at_idx" ON "permissions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_deleted_user_id_idx" ON "permissions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_updated_user_id_idx" ON "permissions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_created_user_id_idx" ON "permissions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255), "module_id" uuid NOT NULL, CONSTRAINT "PK_role_id" PRIMARY KEY ("role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_deleted_at_idx" ON "roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_updated_at_idx" ON "roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_created_at_idx" ON "roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_deleted_user_id_idx" ON "roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_updated_user_id_idx" ON "roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_created_user_id_idx" ON "roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "user_role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_user_role_id" PRIMARY KEY ("user_role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_deleted_at_idx" ON "user_roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_updated_at_idx" ON "user_roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_created_at_idx" ON "user_roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_deleted_user_id_idx" ON "user_roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_updated_user_id_idx" ON "user_roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_created_user_id_idx" ON "user_roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DEACTIVATE', 'DELETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "phone" character varying(20), "avatar" character varying(1000), "status" "public"."users_status_enum" NOT NULL, CONSTRAINT "PK_user_id" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "users_deleted_at_idx" ON "users" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_updated_at_idx" ON "users" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_created_at_idx" ON "users" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_deleted_user_id_idx" ON "users" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_updated_user_id_idx" ON "users" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_created_user_id_idx" ON "users" ("created_user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ADD CONSTRAINT "FK_action_resource_id" FOREIGN KEY ("resource_id") REFERENCES "resources"("resource_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" ADD CONSTRAINT "FK_resource_module_id" FOREIGN KEY ("module_id") REFERENCES "modules"("module_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_permission_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_permission_resource_id" FOREIGN KEY ("resource_id") REFERENCES "resources"("resource_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_permission_action_id" FOREIGN KEY ("action_id") REFERENCES "actions"("action_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_role_module_id" FOREIGN KEY ("module_id") REFERENCES "modules"("module_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_role_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_role_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_role_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_role_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_role_module_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_permission_action_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_permission_resource_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_permission_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" DROP CONSTRAINT "FK_resource_module_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" DROP CONSTRAINT "FK_action_resource_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."users_created_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_updated_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_deleted_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_created_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_deleted_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."user_roles_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."user_roles_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."user_roles_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP INDEX "public"."roles_created_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_updated_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_deleted_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."permissions_created_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."permissions_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."permissions_deleted_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."permissions_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."permissions_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."permissions_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(
      `DROP INDEX "public"."resources_created_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."resources_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."resources_deleted_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."resources_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."resources_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."resources_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "resources"`);
    await queryRunner.query(
      `DROP INDEX "public"."modules_created_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."modules_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."modules_deleted_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."modules_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."modules_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."modules_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "modules"`);
    await queryRunner.query(
      `DROP INDEX "public"."actions_created_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."actions_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."actions_deleted_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."actions_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."actions_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."actions_deleted_at_idx"`);
    await queryRunner.query(`DROP TABLE "actions"`);
  }
}
