import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import FileEntity from "../Domain/File.entity";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import IFileRepository from "../InterfaceAdapters/IFile.repository";
import FileFilter from "../Presentation/Criterias/File.filter";
import BaseMongoRepository from "../../App/Infrastructure/Repositories/Shared/Base.mongo.repository";
import FileMongoSchema from "./File.mongo.schema";
import IFileDocument from "../InterfaceAdapters/IFile.document";
import MongoPaginator from "../../App/Presentation/Shared/MongoPaginator";
import {Query} from "mongoose";

@injectable()
export default class FileMongoRepository extends BaseMongoRepository<FileEntity,IFileDocument> implements IFileRepository<IFileDocument>
{
    constructor()
    {
        super(FileEntity,FileMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IFileDocument[], IFileDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME);
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }
}
