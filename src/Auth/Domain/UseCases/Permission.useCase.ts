import _ from "lodash";
import Permissions from "../../../Config/Permissions";

export default class PermissionUseCase
{
    async handle()
    {
        return _.flatMap(Permissions.permissions());
    }
}
