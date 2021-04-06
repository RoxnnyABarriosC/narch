import { Request } from "express";
import Config from "config";
import {IsString, IsEmail, Length} from "class-validator";
import AuthPayload from "../../InterfaceAdapters/Payloads/Auth.payload";

export default class AuthRequest implements AuthPayload
{
    @IsEmail()
    private email: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    password: string;

    constructor(request: Request)
    {
        this.email = request.body.email;
        this.password = request.body.password;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }
}
