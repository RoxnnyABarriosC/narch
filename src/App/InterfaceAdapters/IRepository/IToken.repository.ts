import IBaseMongoRepository from "./Shared/IBase.mongo.repository";
import ITokenDomain from "../IInfraestructure/IToken.domain";

export default interface ITokenRepository<IDomain extends ITokenDomain> extends IBaseMongoRepository<IDomain> {}