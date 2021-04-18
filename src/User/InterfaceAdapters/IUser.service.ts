import CheckUserRolePayload from "./Payloads/CheckUserRole.payload";

export default interface IUserService
{
    checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>;
}

