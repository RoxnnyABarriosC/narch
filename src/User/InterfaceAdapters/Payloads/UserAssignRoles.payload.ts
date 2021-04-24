import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface UserAssignRolesPayload extends IdPayload
{
    getRolesId(): string[];
}

