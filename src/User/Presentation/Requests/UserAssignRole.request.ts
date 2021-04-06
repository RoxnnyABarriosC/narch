import {Request} from "express";
import {IsArray, IsUUID} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UserAssignRolePayload from "../../InterfaceAdapters/Payloads/UserAssignRole.payload";

export default class UserAssignRoleRequest extends IdRequest implements UserAssignRolePayload
{
    @IsArray()
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
