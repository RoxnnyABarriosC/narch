import IRoleDomain from "../../Role/InterfaceAdapters/IRole.domain";
import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";

export default interface IUserDomain extends IBaseEntityDomain
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string;
    passwordRequestedAt: Date;
    deletedAt: Date;

    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
}
