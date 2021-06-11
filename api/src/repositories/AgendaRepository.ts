import { EntityRepository, Repository } from "typeorm";
import { Agenda } from "../entities/Agenda";

@EntityRepository(Agenda)
class AgendaRepository extends Repository<Agenda> {}
export {AgendaRepository};