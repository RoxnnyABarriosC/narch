import { v4 as uuidv4 } from 'uuid';
import IRoleDomain from "../InterfaceAdapters/IRole.domain";

export default class RoleEntity implements IRoleDomain
{
    _id: string;
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: string)
    {
        this._id = id;
    }
}
