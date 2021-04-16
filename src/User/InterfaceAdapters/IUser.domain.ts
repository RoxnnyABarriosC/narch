import IRoleDomain from "../../Role/InterfaceAdapters/IRole.domain";
import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";
import IFileDomain from "../../File/InterfaceAdapters/IFile.domain";

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
    mainPicture: IFileDomain;
    deletedAt: Date;

    getFullName(): string;
    setRole(role: IRoleDomain): void;
    getRoles(): IRoleDomain[];
    clearRoles(): void;
    getMainPicture(): IFileDomain;
}
