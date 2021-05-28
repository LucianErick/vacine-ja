import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFuncionarios1622155721032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "funcionarios",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "cargo",
                        type: "varchar",
                    },
                    {
                        name: "local_trabalho",
                        type: "varchar",
                    },
                    {
                        name: "isPendente",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "criado_em",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("funcionarios");
    }

}
