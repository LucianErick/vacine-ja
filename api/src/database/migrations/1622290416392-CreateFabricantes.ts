import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFabricantes1622290416392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "fabricantes",
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
                        name: "pais",
                        type: "varchar",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("fabricantes");
    }

}
