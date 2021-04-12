import IUserDomain from "./IUser.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";

export default interface IUserRepository<IDomain extends IUserDomain> extends IBaseSqlRepository<IDomain> {}

