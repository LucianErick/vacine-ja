import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVacinacao1622492602199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacinacoes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "funcionario_id",
                        type: "uuid",
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
                    {
                        name: "lote_id",
                        type: "uuid",
                    },
                    {
                        name: "numero_dose",
                        type: "tinyint"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKFuncionarioVacinacao",
                        referencedTableName: "funcionarios",
                        referencedColumnNames: ["id"],
                        columnNames: ["funcionario_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKCidadao",
                        referencedTableName: "cidadaos",
                        referencedColumnNames: ["id"],
                        columnNames: ["cidadao_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKLote",
                        referencedTableName: "lotes",
                        referencedColumnNames: ["id"],
                        columnNames: ["lote_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacinacoes");
    }
}