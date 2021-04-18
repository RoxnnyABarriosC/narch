import {Request} from "express";
import {IsArray, IsBoolean, IsOptional, IsString, Length} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique"
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App";

export default class UpdateRoleRequest extends IdRequest implements UpdateRolePayload
{
    @Length(3, 30)
    @IsString()
    name: string;

    @Length(3, 30)
    @IsString()
    @Unique({
            repository: REPOSITORIES.IRoleRepository,
            property: 'id'
        },
        {
            message: () =>  Locales.__('general.uniques.role.slug'),
        })
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
