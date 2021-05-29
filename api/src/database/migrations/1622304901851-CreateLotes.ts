import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLotes1622304901851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: "lotes",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "vacina_id",
                    type: "uuid",
                },
                {
                    name: "quantidade",
                    type: "integer",
                },
                {
                    name: "tipo_vacina",
                    type: "tinyint",
                },
                {
                    name: "data_validade",
                    type: "date"
                },
            ],
            foreignKeys: [
                {
                    name: "FKVacina",
                    referencedTableName: "vacinas",
                    referencedColumnNames: ["id"],
                    columnNames: ["vacina_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                }
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("lotes")
    }

}
