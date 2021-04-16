import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Length} from "class-validator";
import UpdateUserPayload from "../../InterfaceAdapters/Payloads/UpdateUser.payload";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";

export default class UpdateUserRequest extends IdRequest implements UpdateUserPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
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

    @IsOptional()
    @IsString()
    @IsUUID('4')
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
}
