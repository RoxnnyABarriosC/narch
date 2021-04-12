import IItemDomain from "./IItem.domain";
import IBaseMongoRepository from "../../App/InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

export default interface IItemRepository<IDomain extends IItemDomain> extends IBaseMongoRepository<IDomain> {}
