import {Query} from 'mongoose';
import {injectable} from 'inversify';
import BaseMongoRepository from "../Shared/Base.mongo.repository";
import TokenEntity from "../../Entities/Token.entity";
import ITokenDocument from "../../../InterfaceAdapters/IInfraestructure/IToken.document";
import TokenMongoSchema from "../../Schema/Mongo/Token.mongo.schema";
import MongoPaginator from "./../../../Presentation/Shared/MongoPaginator"
import ICriteria from "../../../InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../InterfaceAdapters/Shared/IPaginator";
import ITokenRepository from "../../../InterfaceAdapters/IRepository/IToken.repository";

@injectable()
export default class TokenMongoRepository extends BaseMongoRepository<TokenEntity,ITokenDocument> implements ITokenRepository<ITokenDocument>
{
    constructor()
    {
        super(TokenEntity, TokenMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ITokenDocument[], ITokenDocument> = this.repository.find();

        return new MongoPaginator(queryBuilder, criteria);
    }

}