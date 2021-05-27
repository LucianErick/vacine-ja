import { EntityRepository, Repository } from "typeorm";
import { Cidadao } from "../entities/Cidadao";

@EntityRepository(Cidadao)
class CidadaosRepository extends Repository<Cidadao> {}
export {CidadaosRepository};