import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default interface UserAssignRolePayload extends IdPayload
{
    getRolesId(): string[];
}

