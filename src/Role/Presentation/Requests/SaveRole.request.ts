import {Request} from "express";
import {IsArray, IsBoolean, IsOptional, IsString, Length} from "class-validator";
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";

export default class SaveRoleRequest implements SaveRolePayload
{
    @Length(3, 30)
    @IsString()
    name: string;

    @Length(3, 30)
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

    constructor(request: Request | any)
    {
        this.name = request.body.name;
        this.slug = request.body.slug;
        this.permissions = request.body.permissions;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
    }

    getName(): string
    {
        return this.name;
    }

    getSlug(): string
    {
        return this.slug;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getEnable(): boolean
    {
        return this.enable;
    }
}
