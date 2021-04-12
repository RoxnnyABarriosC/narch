import {Document} from "mongoose";
import IBaseEntityDomain from "./IBaseEntityDomain";

export default interface IBaseDocumentDomain extends Document, IBaseEntityDomain {}

