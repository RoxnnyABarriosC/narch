import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface UserAssignPermissionsPayload extends IdPayload
{
    getPermissions(): string[];
}

