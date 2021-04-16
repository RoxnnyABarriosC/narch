import { Request } from "express";
import {IsString, IsEmail, Length, IsUUID, IsOptional} from "class-validator";
import UpdateMePayload from "../../InterfaceAdapters/Payloads/UpdateMe.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique";
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App/App";

export default class UpdateMeRequest extends AuthUserRequest implements UpdateMePayload
{
    @IsString()
    @IsUUID('4')
    id: string;

    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    @Unique({
            repository: REPOSITORIES.IUserRepository,
            property: 'id'
        },
        {
            message: () =>  Locales.__('general.uniques.user.email'),
        })
    email: string

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
        this.id = request.tokenDecode.userId;
        this.mainPictureId = request.body.mainPicture;
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

    getMainPictureId(): string
    {
        return this.mainPictureId;
    }
}
