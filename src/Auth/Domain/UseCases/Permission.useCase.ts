import Permissions from "../../../Config/Permissions";
import _ from "lodash";

export default class PermissionUseCase
{
    async handle()
    {
        return _.flatMap(Permissions.permissions());
    }
}
