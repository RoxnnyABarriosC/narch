import IBaseDocumentDomain from "../../App/InterfaceAdapters/Shared/IBaseDocumentDomain";
import IItemDomain from "./IItem.domain";

export default interface IItemDocument extends IBaseDocumentDomain, IItemDomain {}

