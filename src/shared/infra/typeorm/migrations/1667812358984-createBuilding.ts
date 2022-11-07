import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBuilding1667812358984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'building',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'rooms',
            type: 'Json',
          },
          {
            name: 'longitude',
            type: 'numeric',
          },
          {
            name: 'latitude',
            type: 'numeric',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('building');
  }
}
