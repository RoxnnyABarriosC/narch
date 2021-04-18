import {Request} from "express";
import Config from "config";
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Length} from "class-validator";
import {Match} from "../../../App/Infrastructure/Shared/Decorators/match";
import SaveUserPayload from "../../InterfaceAdapters/Payloads/SaveUser.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique";
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App";

export default class SaveUserRequest extends AuthUserRequest implements SaveUserPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    @Unique({
            repository: REPOSITORIES.IUserRepository
        },
        {
            message: () =>  Locales.__('general.uniques.user.email'),
        })
    email: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    password: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    @Match("password")
    passwordConfirmation: string

    @IsBoolean()
    enable: boolean

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true,

    })
    permissions: string[]

    @IsArray()
    @IsUUID("4", {
        each: true,
    })
    rolesId: string[];

    @IsOptional()
    @IsString()
    @IsUUID('4')
    mainPictureId: string

    constructor(request: Request | any)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.permissions = request.body.permissions;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
        this.mainPictureId = request.body.mainPicture;
        this.rolesId = request.body.rolesId;
    }

    getFirstName(): string
    {
        return this.firstName;
    }

    getLastName(): string
    {
        return this.lastName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getRolesId(): string[]
    {
        return this.rolesId;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getIsSuperAdmin(): boolean
    {
        return false;
    }

    getMainPictureId(): string
    {
        return this.mainPictureId;
    }
}
