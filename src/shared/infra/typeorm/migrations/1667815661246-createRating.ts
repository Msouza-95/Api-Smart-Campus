import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRating1667815661246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rating',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'descriptions',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'number_stars',
            type: 'int',
          },
          {
            name: 'bathroom_id',
            type: 'uuid',
          },
          {
            name: 'problem_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'rating',
      new TableForeignKey({
        name: 'bathroomAndRatingFK',
        columnNames: ['bathroom_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bathroom',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'rating',
      new TableForeignKey({
        name: 'problemAndRatingFK',
        columnNames: ['problem_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rating', 'bathroomAndRatingFK');
    await queryRunner.dropForeignKey('rating', 'problemAndRatingFK');
    await queryRunner.dropTable('rating');
  }
}
