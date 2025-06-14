import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1749635612303 implements MigrationInterface {
  name = 'CreateProductTable1749635612303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_user_id" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_user_id" character varying NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_user_id" character varying, "product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "icon" character varying, CONSTRAINT "PK_product_id" PRIMARY KEY ("product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_deleted_at" ON "products" ("deleted_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_updated_at" ON "products" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_created_at" ON "products" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_deleted_user_id" ON "products" ("deleted_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_updated_user_id" ON "products" ("updated_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_products_created_user_id" ON "products" ("created_user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "modules" ADD "icon" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "modules" ADD "product_id" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_modules_product_id" ON "modules" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "modules" ADD CONSTRAINT "FK_module_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "modules" DROP CONSTRAINT "FK_module_product_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_modules_product_id"`);
    await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "product_id"`);
    await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "icon"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_products_created_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_products_updated_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_products_deleted_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_products_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_products_updated_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_products_deleted_at"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
