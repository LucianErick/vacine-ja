import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cidadao } from "./Cidadao";
import { Funcionario } from "./Funcionario";
import { Lote } from "./LoteVacina";

@Entity("vacinacoes")
class Vacinacao {
    @PrimaryColumn()
    id: string;

    @JoinColumn({name: "funcionario_id"})
    @OneToOne(() => Funcionario)
    funcionario: Funcionario;

    @Column()
    funcionario_id: string;

    @JoinColumn({ name: "cidadao_id" })
    @OneToOne(() => Cidadao)
    cidadao: Cidadao;

    @Column()
    cidadao_id: string;

    @JoinColumn({name: "lote_id"})
    @OneToOne(() => Lote)
    lote: Lote;

    @Column()
    lote_id: string;

    @Column()
    numero_dose: number;

    @Column()
    data: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Vacinacao };