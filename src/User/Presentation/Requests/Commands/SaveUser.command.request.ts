import {IsArray, IsBoolean, IsString} from 'class-validator';
import IRoleDomain from "../../../../Role/InterfaceAdapters/IRole.domain";
import SaveUserCommandPayload from "../../../InterfaceAdapters/Payloads/Commands/SaveUserCommand.payload"

export default class SaveUserCommandRequest implements SaveUserCommandPayload
{
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsBoolean()
    enable: boolean;

    @IsArray()
    @IsString({
        each: true,
    })
    permissions: string[];

    @IsArray()
    roles: IRoleDomain[];

    @IsBoolean()
    isSuperAdmin: boolean;

    constructor(env: any, role: any = null)
    {
        this.email = env.email;
        this.firstName = env.firstName;
        this.lastName = env.lastName;
        this.password = env.password;
        this.enable = true;
        this.roles = role ? [role] : [];
        this.isSuperAdmin = env.isSuperAdmin === 'true';
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
        return this.password;
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
        return this.roles;
    }

    getPermissions(): string[]
    {
        return [];
    }

    getIsSuperAdmin(): boolean
    {
        return this.isSuperAdmin;
    }
}
