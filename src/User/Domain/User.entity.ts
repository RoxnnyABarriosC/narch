import IUserDomain from "../InterfaceAdapters/IUser.domain";
import IRoleDomain from "../../Role/InterfaceAdapters/IRole.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";

export default class UserEntity extends BaseEntity implements IUserDomain
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: IRoleDomain[];
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    confirmationToken: string ;
    passwordRequestedAt: Date ;

    constructor()
    {
        super();
        this.getId = this.getId.bind(this);
    }

    getFullName(): string
    {
        return `${this.firstName} ${this.lastName}`;
    }

    clearRoles(): void
    {
        this.roles = [];
    }

    setRole(role: IRoleDomain): void
    {
        const find = this.roles.find((_role) => _role.getId().toString() === role.getId().toString());

        if (!find)
        {
            this.roles.push(role);
        }
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }
}

