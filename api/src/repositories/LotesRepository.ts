import { EntityRepository, Repository } from "typeorm";
import { Lote } from "../entities/LoteVacina";

@EntityRepository(Lote)
class LotesRepository extends Repository<Lote> { }
export { LotesRepository };