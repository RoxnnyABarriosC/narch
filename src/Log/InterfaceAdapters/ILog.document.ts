import IBaseDocumentDomain from "../../App/InterfaceAdapters/Shared/IBaseDocumentDomain";
import ILogDomain from "./ILog.domain";

export default interface ILogDocument extends IBaseDocumentDomain, ILogDomain {}

