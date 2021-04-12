import IFileDomain from "./IFile.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";

export default interface IFileRepository<IDomain extends IFileDomain> extends IBaseSqlRepository<IDomain> {}
