import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import FileEntity from "../Domain/File.entity";
import FileSqlSchema from "./File.sql.schema";
import IFileDomain from "../InterfaceAdapters/IFile.domain";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import IFileRepository from "../InterfaceAdapters/IFile.repository";
import FileFilter from "../Presentation/Criterias/File.filter";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";

@injectable()
export default class FileSqlRepository extends BaseSqlRepository<FileEntity,IFileDomain> implements IFileRepository<IFileDomain>
{
    constructor()
    {
        super(FileEntity,FileSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        filter.createFilter(queryBuilder,FileFilter, 'NAME', 'andWhere','ilike');

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }
}
