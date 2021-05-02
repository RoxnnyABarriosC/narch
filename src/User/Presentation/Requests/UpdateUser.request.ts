import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Length} from "class-validator";
import UpdateUserPayload from "../../InterfaceAdapters/Payloads/UpdateUser.payload";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import {Unique} from "../../../App/Infrastructure/Shared/Decorators/unique";
import {REPOSITORIES} from "../../../Repositories";
import {Locales} from "../../../App";

export default class UpdateUserRequest extends IdRequest implements UpdateUserPayload
{
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

    @IsBoolean()
    enable: boolean

    @IsString()
    userId: string;

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true,

    })
    permissions: string[];

    @IsArray()
    @ArrayMinSize(0)
    @IsUUID("4", {
        each: true,
    })
    rolesId: string[];

    @IsOptional()
    @IsString()
    @IsUUID('4')
    @Unique({
            repository: REPOSITORIES.IUserRepository,
            dbAttribute: 'mainPicture',
            property: 'id'
        },
        {
            message: () =>  Locales.__('general.uniques.user.mainPicture'),
        })
    mainPictureId: string

    constructor(request: any)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.enable = request.body.enable;
        this.permissions = request.body.permissions;
        this.userId = request.tokenDecode.userId;
        this.mainPictureId = request.body.mainPictureId;
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

    getEnable(): boolean
    {
        return this.enable;
    }

    getTokenUserId(): string
    {
        return this.userId;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getMainPictureId(): string
    {
        return this.mainPictureId;
    }

    getRolesId(): string[]
    {
        return this.rolesId;
    }
}
