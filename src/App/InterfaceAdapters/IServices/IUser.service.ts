import CheckUserRolePayload from "../../../User/InterfaceAdapters/Payloads/CheckUserRole.payload";

export default interface IUserService
{
    checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>;
}

