import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("fabricantes")
class Fabricante {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    pais: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export {Fabricante};