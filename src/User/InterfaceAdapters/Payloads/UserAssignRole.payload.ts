import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface UserAssignRolePayload extends IdPayload
{
    getRolesId(): string[];
}

