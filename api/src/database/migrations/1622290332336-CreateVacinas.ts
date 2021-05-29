import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVacinas1622290332336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vacinas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "fabricante_id",
                        type: "uuid",
                    },
                    {
                        name: "num_doses_necessarias",
                        type: "tinyint",
                    },
                    {
                        name: "intervalo_entre_doses",
                        type: "tinyint"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKFabricante",
                        referencedTableName: "fabricantes",
                        referencedColumnNames: ["id"],
                        columnNames: ["fabricante_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vacinas");
    }

}
