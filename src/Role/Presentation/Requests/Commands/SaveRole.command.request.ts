import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import SaveRoleCommandPayload from "../../../InterfaceAdapters/Payloads/Commands/SaveRoleCommand.payload";

export default class SaveRoleCommandRequest implements SaveRoleCommandPayload
{
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsArray()
    @IsString({
        each: true,
    })
    permissions: string[];

    @IsOptional()
    @IsBoolean()
    enable: boolean;

    constructor(env: any)
    {
        this.name = env.name;
        this.slug = env.slug.toLowerCase();
        this.permissions = [];
        this.enable = true;
    }

    getName(): string
    {
        return this.name;
    }

    getSlug(): string
    {
        return this.slug;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getPermissions(): any[]
    {
        return [];
    }
}
