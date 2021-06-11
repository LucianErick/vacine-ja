import { Cidadao } from "../entities/Cidadao";
import { EstadoVacinacao } from "./EstadoVacinacao";
import { HabilitadoPrimeiraDose } from "./HabilitadoPrimeiraDose";

class Inabilitado extends EstadoVacinacao {

    atualizaEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new HabilitadoPrimeiraDose());
    }
    toString(): string {
        return "Cidadão inabilitado para tomar a vacina.";
    }
}

export { Inabilitado };