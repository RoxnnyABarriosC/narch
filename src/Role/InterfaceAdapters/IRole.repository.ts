import IBaseRepository from "../../App/InterfaceAdapters/IRepository/IBase.repository";
import IRoleDomain from "./IRole.domain";

export default interface IRoleRepository<IDomain extends IRoleDomain> extends IBaseRepository<IDomain> {}
