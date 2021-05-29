import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Vacina } from "./Vacina";

@Entity("lotes")
class Lote {
    @PrimaryColumn()
    id: string;

    @JoinColumn({name: "vacina_id"})
    @ManyToOne(() => Vacina)
    vacina: Vacina;

    @Column()
    vacina_id: string;

    @Column()
    quantidade: number;

    @Column()
    tipo_vacina: number;

    @Column()
    data_validade: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Lote }
