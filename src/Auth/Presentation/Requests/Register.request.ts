import { Request } from "express";
import Config from "config";
import {IsString, IsEmail, Length, IsBoolean} from "class-validator";
import {Match} from "../../../App/Infrastructure/Shared/Decorators/match";
import RegisterPayload from "../../InterfaceAdapters/Payloads/Register.payload";
import Roles from "../../../Config/Roles";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique";
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App";

export default class RegisterRequest implements RegisterPayload
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

    constructor(request: Request | any)
    {
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = true;
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

    getRoles(): string[]
    {
        return [Roles.OPERATOR.toLowerCase()];
    }

    getPermissions(): string[]
    {
        return [];
    }

    getIsSuperAdmin(): boolean
    {
        return false;
    }
}
