import IBaseRepository from "../../App/InterfaceAdapters/IRepository/IBase.repository";
import IFileDomain from "./IFile.domain";

export default interface IFileRepository<IDomain extends IFileDomain> extends IBaseRepository<IDomain> {}
