import faker from "faker";
import IUserRepository from "../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../Role/InterfaceAdapters/IRole.repository";
import ContainerFactory from "../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../Repositories";
import IEncryption from "../../App/InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../App/Infrastructure/Factories/Encryption.factory";
import IRoleDomain from "../../Role/InterfaceAdapters/IRole.domain";
import RoleEntity from "../../Role/Domain/Role.entity";
import UserEntity from "../Domain/User.entity";
import IUserDomain from "../InterfaceAdapters/IUser.domain";


export default class UserSqlSeed
{
    private userRepository: IUserRepository;
    private roleRepository: IRoleRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.userRepository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
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

        const roleOperatorDisabled: IRoleDomain = new RoleEntity();
        roleOperatorDisabled.name = 'OperatorDisabled';
        roleOperatorDisabled.slug = 'operatordisabled';
        roleOperatorDisabled.permissions = [];
        roleOperatorDisabled.enable = false;

        await this.roleRepository.save(roleOperatorDisabled);

        let userSuperAdmin: IUserDomain = new UserEntity();
        userSuperAdmin.firstName = 'Super';
        userSuperAdmin.lastName = 'Admin';
        userSuperAdmin.email = 'superadmin@node.com';
        userSuperAdmin.password = await this.encryption.encrypt('12345678');
        userSuperAdmin.enable = true;
        userSuperAdmin.confirmationToken = null;
        userSuperAdmin.passwordRequestedAt = null;
        userSuperAdmin.permissions = [];
        userSuperAdmin.roles = [roleSuperAdmin];
        userSuperAdmin.isSuperAdmin = true;

        await this.userRepository.save(userSuperAdmin);

        let userAdmin: IUserDomain = new UserEntity();
        userAdmin.firstName = 'user';
        userAdmin.lastName = 'node';
        userAdmin.email = 'user@node.com';
        userAdmin.password = await this.encryption.encrypt('12345678');
        userAdmin.enable = true;
        userAdmin.confirmationToken = null;
        userAdmin.passwordRequestedAt = null;
        userAdmin.permissions = [];
        userAdmin.roles = [roleAdmin];
        userAdmin.isSuperAdmin = false;

        await this.userRepository.save(userAdmin);

        let userOperator: IUserDomain = new UserEntity();
        userOperator.firstName = 'operator';
        userOperator.lastName = 'enable';
        userOperator.email = 'operator@enable.com';
        userOperator.password = await this.encryption.encrypt('123456789');
        userOperator.enable = true;
        userOperator.confirmationToken = null;
        userOperator.passwordRequestedAt = null;
        userOperator.permissions = [];
        userOperator.roles = [roleOperator];
        userOperator.isSuperAdmin = false;

        await this.userRepository.save(userOperator);

        let userOperatorDisabled: IUserDomain = new UserEntity();
        userOperatorDisabled.firstName = 'operator';
        userOperatorDisabled.lastName = 'disabled';
        userOperatorDisabled.email = 'operator@disabled.com';
        userOperatorDisabled.password = await this.encryption.encrypt('1234567901');
        userOperatorDisabled.enable = false;
        userOperatorDisabled.confirmationToken = null;
        userOperatorDisabled.passwordRequestedAt = null;
        userOperatorDisabled.permissions = [];
        userOperatorDisabled.roles = [roleOperator];
        userOperatorDisabled.isSuperAdmin = false;

        await this.userRepository.save(userOperatorDisabled);

        let userOperatorRoleDisabled: IUserDomain = new UserEntity();
        userOperatorRoleDisabled.firstName = 'operator';
        userOperatorRoleDisabled.lastName = 'roleDisabled';
        userOperatorRoleDisabled.email = 'operator@roleDisabled.com';
        userOperatorRoleDisabled.password = await this.encryption.encrypt('123456790');
        userOperatorRoleDisabled.enable = true;
        userOperatorRoleDisabled.confirmationToken = null;
        userOperatorRoleDisabled.passwordRequestedAt = null;
        userOperatorRoleDisabled.permissions = [];
        userOperatorRoleDisabled.roles = [roleOperatorDisabled];
        userOperatorRoleDisabled.isSuperAdmin = false;

        await this.userRepository.save(userOperatorRoleDisabled);
    }
}
