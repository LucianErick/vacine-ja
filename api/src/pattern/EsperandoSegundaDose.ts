import { Cidadao } from "../entities/Cidadao";
import { EstadoVacinacao } from "./EstadoVacinacao";
import { HabilitadoSegundaDose } from "./HabilitadoSegundaDose";

class EsperandoSegundaDose extends EstadoVacinacao {

    atualizaEstado(cidadao: Cidadao): void {
        cidadao.setEstado(new HabilitadoSegundaDose());
    }
    toString(): string {
        throw new Error("Cidadão vacinado da primeira dose.");
    }

}

export { EsperandoSegundaDose };