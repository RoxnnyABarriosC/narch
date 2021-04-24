import {Request} from "express";
import {ArrayMinSize, IsArray, IsString} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UserAssignPermissionsPayload from "../../InterfaceAdapters/Payloads/UserAssignPermissions.payload";

export default class UserAssignPermissionsRequest extends IdRequest implements UserAssignPermissionsPayload
{
    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true,

    })
    permissions: string[]

    constructor(request: Request | any)
    {
        super(request);
        this.permissions = request.body.permissions;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }
}
