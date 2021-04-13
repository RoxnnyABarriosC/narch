import IFileDomain from "./IFile.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

// @ts-ignore
export default interface IFileRepository<IDomain extends IFileDomain> extends IBaseSqlRepository<IDomain>, IBaseMongoRepository<IDomain> {}
