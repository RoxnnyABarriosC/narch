import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import SaveItemPayload from "./SaveItem.payload";

export default interface UpdateITemPayload extends IdPayload, SaveItemPayload {}

