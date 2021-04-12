import IRoleDomain from "./IRole.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";

export default interface IRoleRepository<IDomain extends IRoleDomain> extends IBaseSqlRepository<IDomain> {}
