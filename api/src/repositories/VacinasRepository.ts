import { EntityRepository, Repository } from "typeorm";
import { Vacina } from "../entities/Vacina";

@EntityRepository(Vacina)
class VacinasRepository extends Repository<Vacina> {}
export {VacinasRepository};