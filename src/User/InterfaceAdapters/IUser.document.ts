import IBaseDocumentDomain from "../../App/InterfaceAdapters/Shared/IBaseDocumentDomain";
import IUserDomain from "./IUser.domain";

export default interface IUserDocument extends IBaseDocumentDomain, IUserDomain {}

