import IBaseDocumentDomain from "../../App/InterfaceAdapters/Shared/IBaseDocumentDomain";
import IFileDomain from "./IFile.domain";

export default interface IFileDocument extends IBaseDocumentDomain, IFileDomain {}

