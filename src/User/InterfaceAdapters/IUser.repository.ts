import IBaseRepository from "../../App/InterfaceAdapters/IRepository/IBase.repository";
import IUserDomain from "./IUser.domain";

export default interface IUserRepository<IDomain extends IUserDomain> extends IBaseRepository<IDomain> {}

