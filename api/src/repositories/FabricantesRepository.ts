import { EntityRepository, Repository } from "typeorm";
import { Fabricante } from "../entities/Fabricante";

@EntityRepository(Fabricante)
class FabricantesRepository extends Repository<Fabricante> {}
export {FabricantesRepository};