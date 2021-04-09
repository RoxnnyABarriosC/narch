import {DeleteResult, getRepository, Repository} from "typeorm";
import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import FileEntity from "../Domain/File.entity";
import FileSqlSchema from "./File.sql.schema";
import IFileDomain from "../InterfaceAdapters/IFile.domain";
import NotFoundException from "../../App/Infrastructure/Exceptions/NotFound.exception";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import IFileRepository from "../InterfaceAdapters/IFile.repository";
import FileFilter from "../Presentation/Criterias/File.filter";

@injectable()
export default class FileSqlRepository implements IFileRepository
{
    private repository: Repository<FileEntity>;

    constructor()
    {
        this.repository = getRepository<FileEntity>(FileSqlSchema);
    }

    async save (file: IFileDomain ): Promise<IFileDomain>
    {
        return await this.repository.save(file);
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        const file = await this.repository.findOne(id);

        if (!file)
        {
            throw new NotFoundException(FileEntity.name.replace('Entity',''));
        }

        return file;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        filter.createFilter(queryBuilder,FileFilter, FileFilter.NAME, 'andWhere','ilike');

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }

    async update(file: IFileDomain): Promise<any>
    {
        await this.repository.save(file);
    }

    async delete(id: any): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

    async getBy(condition: {}, initThrow = false): Promise<IFileDomain[]>
    {
        const files: IFileDomain[] = await this.repository.find(condition);

        if(initThrow && files.length === 0)
        {
            throw new NotFoundException(FileEntity.name.replace('Entity',''));
        }

        return files;
    }

    async getOneBy(condition: {}, initThrow = true): Promise<any>
    {
        const file: IFileDomain = await this.repository.findOne(condition);

        if(initThrow && !file)
        {
            throw new NotFoundException(FileEntity.name.replace('Entity',''));
        }

        return file;
    }

}
