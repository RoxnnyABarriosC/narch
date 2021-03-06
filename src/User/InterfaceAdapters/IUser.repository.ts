import IUserDomain from "./IUser.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

// @ts-ignore
export default interface IUserRepository<IDomain extends IUserDomain> extends IBaseSqlRepository<IDomain>, IBaseMongoRepository<IDomain> {}

