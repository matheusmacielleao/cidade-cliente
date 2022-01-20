import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateClients1641844763459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'clients',
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
              name: 'gender',
              type: 'char',

            },
            {
              name: 'birthdate',
              type: 'date',
            },
            {
              name: 'cityId',
              type: 'uuid',
            },
          ],
          foreignKeys: [
            {
              name: 'fk_client_city',
              columnNames: ['cityId'],
              referencedTableName: 'cities',
              referencedColumnNames: ['id'],

            },
          ],
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
