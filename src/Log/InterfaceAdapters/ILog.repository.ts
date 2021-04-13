import ILogDomain from "./ILog.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

// @ts-ignore
export default interface ILogRepository<IDomain extends ILogDomain> extends  IBaseSqlRepository<IDomain>, IBaseMongoRepository<IDomain> {}
