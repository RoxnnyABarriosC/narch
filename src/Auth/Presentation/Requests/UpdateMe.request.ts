import { Request } from "express";
import {IsString, IsEmail, Length} from "class-validator";
import UpdateMePayload from "../../InterfaceAdapters/Payloads/UpdateMe.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique";
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App/App";

export default class UpdateMeRequest extends AuthUserRequest implements UpdateMePayload
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
