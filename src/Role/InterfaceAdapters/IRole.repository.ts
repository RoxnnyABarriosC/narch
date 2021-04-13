import IRoleDomain from "./IRole.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

// @ts-ignore
export default interface IRoleRepository<IDomain extends IRoleDomain> extends IBaseSqlRepository<IDomain>, IBaseMongoRepository<IDomain>{}
