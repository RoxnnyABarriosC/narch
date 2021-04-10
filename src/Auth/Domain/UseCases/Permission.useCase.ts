import _ from "lodash";
import Permissions from "../../../Config/Permissions";

export default class PermissionUseCase
{
    async handle()
    {
        return Permissions.permissions();
    }
}
