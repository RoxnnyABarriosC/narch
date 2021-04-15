import { Request } from "express";
import {IsString, IsEmail, Length} from "class-validator";
import UpdateMePayload from "../../InterfaceAdapters/Payloads/UpdateMe.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";

export default class UpdateMeRequest extends AuthUserRequest implements UpdateMePayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    constructor(request: Request | any)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
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
}
