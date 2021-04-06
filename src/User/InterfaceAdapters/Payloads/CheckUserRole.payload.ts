import IUserDomain from "../IUser.domain";

export default interface CheckUserRolePayload
{
    roleToCheck: string;
    user:  IUserDomain;
}

