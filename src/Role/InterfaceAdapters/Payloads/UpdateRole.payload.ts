import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";
import SaveRolePayload from "./SaveRole.payload";

export default interface UpdateRolePayload extends IdPayload, SaveRolePayload {}

