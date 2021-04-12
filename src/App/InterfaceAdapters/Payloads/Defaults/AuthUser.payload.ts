import IUserDomain from "../../../../User/InterfaceAdapters/IUser.domain";

export default interface AuthUserPayload
{
    getAuthUser(): IUserDomain;
}
