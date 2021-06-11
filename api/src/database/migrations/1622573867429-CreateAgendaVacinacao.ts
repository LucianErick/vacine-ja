import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAgendaVacinacao1622573867429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "agenda",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "cidadao_id",
                        type: "uuid",
                    },
                    {
                        name: "data",
                        type: "datetime",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCidadao",
                        referencedTableName: "cidadaos",
                        referencedColumnNames: ["id"],
                        columnNames: ["cidadao_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("agenda");
    }
}
