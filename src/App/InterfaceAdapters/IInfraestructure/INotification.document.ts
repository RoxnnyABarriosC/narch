import INotificationDomain from "./INotification.domain";
import IBaseDocumentDomain from "./../../InterfaceAdapters/Shared/IBaseDocumentDomain";

export default interface INotificationDocument extends IBaseDocumentDomain, INotificationDomain {}