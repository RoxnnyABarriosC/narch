import { Request } from "express";
import Config from "config";
import {IsString, IsEmail, Length, IsBoolean} from "class-validator";
import {Match} from "../../../App/Infrastructure/Shared/Decorators/match";
import RegisterPayload from "../../InterfaceAdapters/Payloads/Register.payload";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";

export default class RegisterRequest implements RegisterPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
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
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
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

    getConfirmationToken(): null
    {
        return null;
    }

    getPasswordRequestedAt(): null
    {
        return null;
    }

    getRoles(): IRoleDomain[]
    {
        return [];
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
