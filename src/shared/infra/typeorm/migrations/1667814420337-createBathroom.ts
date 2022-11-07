import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createBathroom1667814420337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bathroom',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'average_rating',
            type: 'int',
          },
          {
            name: 'building_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bathroom',
      new TableForeignKey({
        name: 'buildingAndBathroomFK',
        columnNames: ['building_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'building',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bathroom', 'buildingAndBathroomFK');

    await queryRunner.dropTable('bathroom');
  }
}
