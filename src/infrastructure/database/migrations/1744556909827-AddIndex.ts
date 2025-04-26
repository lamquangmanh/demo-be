import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndex1744556909827 implements MigrationInterface {
  name = 'AddIndex1744556909827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."users_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_deleted_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_updated_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_created_user_id_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_created_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."user_roles_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."user_roles_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."user_roles_created_at_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_deleted_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."user_roles_updated_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."actions_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."actions_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."actions_created_at_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."actions_deleted_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."actions_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."actions_created_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."modules_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."modules_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."modules_created_at_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."modules_deleted_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."modules_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."modules_created_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."resources_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."resources_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."resources_created_at_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."resources_deleted_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."resources_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."resources_created_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."permissions_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."permissions_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."permissions_created_at_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."permissions_deleted_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."permissions_updated_user_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."permissions_created_user_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."roles_deleted_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_updated_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_created_at_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_deleted_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_updated_user_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."roles_created_user_id_idx"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_users_deleted_at" ON "users" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_updated_at" ON "users" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_created_at" ON "users" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_deleted_user_id" ON "users" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_updated_user_id" ON "users" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_users_created_user_id" ON "users" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_role_id" ON "user_roles" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_user_id" ON "user_roles" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_deleted_at" ON "user_roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_updated_at" ON "user_roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_created_at" ON "user_roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_deleted_user_id" ON "user_roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_updated_user_id" ON "user_roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_user_roles_created_user_id" ON "user_roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_resource_id" ON "actions" ("resource_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_deleted_at" ON "actions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_updated_at" ON "actions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_created_at" ON "actions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_deleted_user_id" ON "actions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_updated_user_id" ON "actions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_actions_created_user_id" ON "actions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_deleted_at" ON "modules" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_updated_at" ON "modules" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_created_at" ON "modules" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_deleted_user_id" ON "modules" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_updated_user_id" ON "modules" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_created_user_id" ON "modules" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_module_id" ON "resources" ("module_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_deleted_at" ON "resources" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_updated_at" ON "resources" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_created_at" ON "resources" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_deleted_user_id" ON "resources" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_updated_user_id" ON "resources" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_resources_created_user_id" ON "resources" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_action_id" ON "permissions" ("action_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_resource_id" ON "permissions" ("resource_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_role_id" ON "permissions" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_deleted_at" ON "permissions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_updated_at" ON "permissions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_created_at" ON "permissions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_deleted_user_id" ON "permissions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_updated_user_id" ON "permissions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permissions_created_user_id" ON "permissions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_module_id" ON "roles" ("module_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_deleted_at" ON "roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_updated_at" ON "roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_created_at" ON "roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_deleted_user_id" ON "roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_updated_user_id" ON "roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_roles_created_user_id" ON "roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_users_email_deleted_at" UNIQUE ("email", "deleted_at")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_users_email_deleted_at"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_created_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_updated_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_deleted_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_roles_module_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_permissions_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_permissions_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_permissions_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_permissions_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_permissions_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_permissions_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_permissions_role_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_permissions_resource_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_permissions_action_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_resources_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_resources_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_resources_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_resources_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_resources_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_resources_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_resources_module_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_modules_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_modules_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_modules_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_modules_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_modules_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_modules_deleted_at"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_actions_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_actions_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_actions_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_actions_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_actions_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_actions_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_actions_resource_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_user_roles_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_user_roles_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_user_roles_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_role_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_created_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_updated_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_deleted_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_deleted_at"`);
    await queryRunner.query(
      `CREATE INDEX "roles_created_user_id_idx" ON "roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_updated_user_id_idx" ON "roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_deleted_user_id_idx" ON "roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_created_at_idx" ON "roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_updated_at_idx" ON "roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "roles_deleted_at_idx" ON "roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_created_user_id_idx" ON "permissions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_updated_user_id_idx" ON "permissions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_deleted_user_id_idx" ON "permissions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_created_at_idx" ON "permissions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_updated_at_idx" ON "permissions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "permissions_deleted_at_idx" ON "permissions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_created_user_id_idx" ON "resources" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_updated_user_id_idx" ON "resources" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_deleted_user_id_idx" ON "resources" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_created_at_idx" ON "resources" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_updated_at_idx" ON "resources" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "resources_deleted_at_idx" ON "resources" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_created_user_id_idx" ON "modules" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_updated_user_id_idx" ON "modules" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_deleted_user_id_idx" ON "modules" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_created_at_idx" ON "modules" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_updated_at_idx" ON "modules" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "modules_deleted_at_idx" ON "modules" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_created_user_id_idx" ON "actions" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_updated_user_id_idx" ON "actions" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_deleted_user_id_idx" ON "actions" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_created_at_idx" ON "actions" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_updated_at_idx" ON "actions" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "actions_deleted_at_idx" ON "actions" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_updated_user_id_idx" ON "user_roles" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_deleted_user_id_idx" ON "user_roles" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_created_at_idx" ON "user_roles" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_updated_at_idx" ON "user_roles" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_deleted_at_idx" ON "user_roles" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "user_roles_created_user_id_idx" ON "user_roles" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_created_user_id_idx" ON "users" ("created_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_updated_user_id_idx" ON "users" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_deleted_user_id_idx" ON "users" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_created_at_idx" ON "users" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_updated_at_idx" ON "users" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "users_deleted_at_idx" ON "users" ("deleted_at") `,
    );
  }
}
