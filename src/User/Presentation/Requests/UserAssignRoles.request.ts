import {Request} from "express";
import {ArrayMinSize, IsArray, IsUUID} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UserAssignRolesPayload from "../../InterfaceAdapters/Payloads/UserAssignRoles.payload";

export default class UserAssignRolesRequest extends IdRequest implements UserAssignRolesPayload
{
    @IsArray()
    @ArrayMinSize(0)
    @IsUUID("4", {
        each: true,
    })
    rolesId: string[]

    constructor(request: Request | any)
    {
        super(request);
        this.rolesId = request.body.rolesId;
    }

    getRolesId(): string[]
    {
        return this.rolesId;
    }
}
