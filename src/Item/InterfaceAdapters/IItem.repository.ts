import IItemDomain from "./IItem.domain";
import IBaseSqlRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.sql.repository";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

// @ts-ignore
export default interface IItemRepository<IDomain extends IItemDomain> extends  IBaseSqlRepository<IDomain>, IBaseMongoRepository<IDomain> {}
