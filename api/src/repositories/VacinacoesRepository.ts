import { EntityRepository, Repository } from "typeorm";
import { Vacinacao } from "../entities/Vacinacao";

@EntityRepository(Vacinacao)
class VacinacoesRepository extends Repository<Vacinacao> {}
export {VacinacoesRepository};