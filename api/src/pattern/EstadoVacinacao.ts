import { Cidadao } from "../entities/Cidadao";

interface IEstadoVacinacao {
    atualizaEstado(cidadao: Cidadao): void,
    toString(): string
}

abstract class EstadoVacinacao implements IEstadoVacinacao {
    atualizaEstado(cidadao: Cidadao): void {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
}

export { EstadoVacinacao }