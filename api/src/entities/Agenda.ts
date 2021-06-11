import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cidadao } from "./Cidadao";

@Entity("agenda")
class Agenda {

    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: "cidadao_id" })
    @OneToOne(() => Cidadao)
    cidadao: Cidadao;

    @Column()
    cidadao_id: string;

    @Column()
    data: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Agenda }