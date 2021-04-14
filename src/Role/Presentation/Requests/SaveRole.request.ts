import {Request} from "express";
import {IsArray, IsBoolean, IsOptional, IsString, Length} from "class-validator";
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique"
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App/App";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";

export default class SaveRoleRequest extends AuthUserRequest implements SaveRolePayload
{
    @Length(3, 30)
    @IsString()
    name: string;

    @Length(3, 30)
    @IsString()
    @Unique({
            repository: REPOSITORIES.IRoleRepository
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
