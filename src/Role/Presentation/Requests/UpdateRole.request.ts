import {Request} from "express";
import {IsArray, IsBoolean, IsOptional, IsString} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";

export default class UpdateRoleRequest extends IdRequest implements UpdateRolePayload
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

    constructor(request: Request | any)
    {
        super(request);
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
