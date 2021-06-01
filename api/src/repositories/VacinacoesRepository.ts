import { EntityRepository, Repository } from "typeorm";
import { Vacina } from "../entities/Vacina";
import { Vacinacao } from "../entities/Vacinacao";

@EntityRepository(Vacinacao)
class VacinacoesRepository extends Repository<Vacinacao> {}
export {VacinacoesRepository};