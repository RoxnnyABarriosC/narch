import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import SaveRolePayload from "./SaveRole.payload";

export default interface UpdateRolePayload extends IdPayload, SaveRolePayload {}

