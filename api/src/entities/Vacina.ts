import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Fabricante } from "./Fabricante";

@Entity("vacinas")
class Vacina {
    @PrimaryColumn()
    id: string;
    
    @Column()
    nome: string;

    @JoinColumn({ name: "fabricante_id" })
    @OneToOne(() => Fabricante)
    fabricante: Fabricante;

    @Column()
    fabricante_id: string;
    
    @Column()
    num_doses_necessarias: number;
    
    @Column()
    intervalo_entre_doses: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Vacina };