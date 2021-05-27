import { EntityRepository, Repository } from "typeorm";
import { Administrador } from "../entities/Admin";

@EntityRepository(Administrador)
class AdministradoresRepository extends Repository<Administrador> {}
export {AdministradoresRepository};