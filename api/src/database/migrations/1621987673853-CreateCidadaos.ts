import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCidadaos1621987673853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cidadaos",
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
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "endereco",
                        type: "varchar",
                    },
                    {
                        name: "num_cartao_sus",
                        type: "varchar",
                    },
                    {
                        name: "data_nascimento",
                        type: "date",
                    },
                    {
                        name: "telefone",
                        type: "varchar",
                    },
                    {
                        name: "profissao",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "comorbidade",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "criado_em",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "estado_vacinacao",
                        type: "tinyint"
                    },
                    {
                        name: "vacina_aplicada",
                        type: "uuid",
                        isNullable: true,
                    }
                ],
                foreignKeys: [
                    {

                        name: "FKCidadaoVacinaAplicada",
                        referencedTableName: "vacinas",
                        referencedColumnNames: ["id"],
                        columnNames: ["vacina_aplicada"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cidadaos");
    }

}
