import lazyInject from "../../LazyInject";
import {REPOSITORIES} from "../../Repositories";
import IUserRepository from "../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../Role/InterfaceAdapters/IRole.repository";
import IEncryption from "../../App/InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../App/Infrastructure/Factories/Encryption.factory";
import IRoleDomain from "../../Role/InterfaceAdapters/IRole.domain";
import RoleEntity from "../../Role/Domain/Role.entity";
import UserEntity from "../Domain/User.entity";
import IUserDomain from "../InterfaceAdapters/IUser.domain";

export default class UserSeed
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public async authInit()
    {
        const roleSuperAdmin: IRoleDomain = new RoleEntity();
        roleSuperAdmin.name = 'SuperAdmin';
        roleSuperAdmin.slug = 'superadmin';
        roleSuperAdmin.permissions = [];
        roleSuperAdmin.enable = true;

        await this.roleRepository.save(roleSuperAdmin);

        const roleAdmin: IRoleDomain = new RoleEntity();
        roleAdmin.name = 'Admin';
        roleAdmin.slug = 'admin';
        roleAdmin.permissions = [];
        roleAdmin.enable = true;

        await this.roleRepository.save(roleAdmin);

        const roleOperator: IRoleDomain = new RoleEntity();
        roleOperator.name = 'Operator';
        roleOperator.slug = 'operator';
        roleOperator.permissions = [];
        roleOperator.enable = true;

        await this.roleRepository.save(roleOperator);

        let userSuperAdmin: IUserDomain = new UserEntity();
        userSuperAdmin.firstName = 'Super';
        userSuperAdmin.lastName = 'Admin';
        userSuperAdmin.email = 'superadmin@narchjs.com';
        userSuperAdmin.password = await this.encryption.encrypt('1234567890');
        userSuperAdmin.enable = true;
        userSuperAdmin.confirmationToken = null;
        userSuperAdmin.passwordRequestedAt = null;
        userSuperAdmin.permissions = [];
        userSuperAdmin.roles = [roleSuperAdmin];
        userSuperAdmin.isSuperAdmin = true;

        await this.userRepository.save(userSuperAdmin);

        let userAdmin: IUserDomain = new UserEntity();
        userAdmin.firstName = 'admin';
        userAdmin.lastName = 'admin';
        userAdmin.email = 'admin@narchjs.com';
        userAdmin.password = await this.encryption.encrypt('1234567890');
        userAdmin.enable = true;
        userAdmin.confirmationToken = null;
        userAdmin.passwordRequestedAt = null;
        userAdmin.permissions = [];
        userAdmin.roles = [roleAdmin];
        userAdmin.isSuperAdmin = false;

        await this.userRepository.save(userAdmin);

        let userOperator: IUserDomain = new UserEntity();
        userOperator.firstName = 'operator';
        userOperator.lastName = 'operator';
        userOperator.email = 'operator@narchjs.com';
        userOperator.password = await this.encryption.encrypt('1234567890');
        userOperator.enable = true;
        userOperator.confirmationToken = null;
        userOperator.passwordRequestedAt = null;
        userOperator.permissions = [];
        userOperator.roles = [roleOperator];
        userOperator.isSuperAdmin = false;

        await this.userRepository.save(userOperator);
    }
}
