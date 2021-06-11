import { Cidadao } from "../entities/Cidadao";
import { EsperandoSegundaDose } from "./EsperandoSegundaDose";
import { EstadoVacinacao } from "./EstadoVacinacao";
import { Vacinado } from "./Vacinado";

class HabilitadoPrimeiraDose extends EstadoVacinacao {

    atualizaEstado(cidadao: Cidadao): void {
        if (cidadao.vacinaAplicada.num_doses_necessarias === 2) {
            cidadao.setEstado(new EsperandoSegundaDose());
        } else {
            cidadao.setEstado(new Vacinado());
        }
    }
    toString(): string {
        throw new Error("Cidadão habilitado para tomar a primeira dose.");
    }
}

export { HabilitadoPrimeiraDose };