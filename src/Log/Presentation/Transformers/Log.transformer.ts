import Transformer from "../../../App/Presentation/Shared/Transformer";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";
import UserRelationshipTransformer from "../../../User/Presentation/Transformers/UserRelationship.transformer";

export default class LogTransformer extends Transformer
{
    private userRelationshipTransformer: UserRelationshipTransformer;

    constructor()
    {
        super();
        this.userRelationshipTransformer = new UserRelationshipTransformer();
    }

    public transform(log: ILogDomain)
    {
        return {
            id: log.getId(),
            action: log.action,
            entity: log.entity,
            entityId: log.entityId,
            description: log.description,
            metadata: log.metadata,
            createdBy: this.validate(log.getCreatedBy(),'userRelationshipTransformer'),
            createdAt: this.unixDate(log.createdAt),
            updatedAt: this.unixDate(log.updatedAt),
        };
    }
}
