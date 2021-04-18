import container from "./Container";

import {SERVICES} from "./Services";
import {Types} from "./Types";
import {REPOSITORIES} from "./Repositories";

import Config from "config";

import IAuthService from "./User/InterfaceAdapters/IAuth.service";
import AuthService from "./Auth/Infrastructure/Services/Auth.service";

import IUserService from "./User/InterfaceAdapters/IUser.service";
import UserService from "./User/Infrastructure/Services/User.service";

import Responder from "./App/Presentation/Shared/Responder";
import IFormatResponder from "./App/InterfaceAdapters/Shared/IFormatResponder";
import FormatResponder from "./App/Presentation/Shared/FormatResponder";

import IUserRepository from "./User/InterfaceAdapters/IUser.repository";
import UserSqlRepository from "./User/Infrastructure/User.sql.repository";
import UserMongoRepository from "./User/Infrastructure/User.mongo.repository";
import IUserDomain from "./User/InterfaceAdapters/IUser.domain";

import IRoleRepository from "./Role/InterfaceAdapters/IRole.repository";
import RoleSqlRepository from "./Role/Infrastructure/Role.sql.repository";
import RoleMongoRepository from "./Role/Infrastructure/Role.mongo.repository";
import IRoleDomain from "./Role/InterfaceAdapters/IRole.domain";

import IFileRepository from "./File/InterfaceAdapters/IFile.repository";
import FileSqlRepository from "./File/Infrastructure/File.sql.repository";
import FileMongoRepository from "./File/Infrastructure/File.mongo.repository";
import IFileDomain from "./File/InterfaceAdapters/IFile.domain";

import {ITokenRepository} from "@digichanges/shared-experience";
import TokenRedisRepository from "./App/Infrastructure/Repositories/Redis/Token.redis.repository";

import INotificationRepository from "./App/InterfaceAdapters/IRepository/INotification.repository";
import NotificationSqlRepository from "./App/Infrastructure/Repositories/Sql/Notification.sql.repository";

import IItemRepository from "./Item/InterfaceAdapters/IItem.repository";
import IItemDomain from "./Item/InterfaceAdapters/IItem.domain";
import ItemSqlRepository from "./Item/Infrastructure/Item.sql.repository";
import ItemMongoRepository from "./Item/Infrastructure/Item.mongo.repository";

import ILogRepository from "./Log/InterfaceAdapters/ILog.repository";
import ILogDomain from "./Log/InterfaceAdapters/ILog.domain";
import LogSqlRepository from "./Log/Infrastructure/Log.sql.repository";
import LogMongoRepository from "./Log/Infrastructure/Log.mongo.repository";

/* IServices */
container.bind<IAuthService>(SERVICES.IAuthService).to(AuthService);
container.bind<IUserService>(SERVICES.IUserService).to(UserService);

/** Libs */
container.bind<Responder>(Types.Responder).to(Responder);
container.bind<IFormatResponder>(Types.IFormatResponder).to(FormatResponder);

/** Repositories */
if (Config.get('dbConfig.default') === 'TypeORM')
{
    container.bind<IUserRepository<IUserDomain>>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
    container.bind<IRoleRepository<IRoleDomain>>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
    container.bind<IFileRepository<IFileDomain>>(REPOSITORIES.IFileRepository).to(FileSqlRepository);
    container.bind<ILogRepository<ILogDomain>>(REPOSITORIES.ILogRepository).to(LogSqlRepository);
    container.bind<IItemRepository<IItemDomain>>(REPOSITORIES.IItemRepository).to(ItemSqlRepository);
}

else if (Config.get('dbConfig.default') === 'Mongoose')
{
    container.bind<IUserRepository<IUserDomain>>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
    container.bind<IRoleRepository<IRoleDomain>>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);
    container.bind<IFileRepository<IFileDomain>>(REPOSITORIES.IFileRepository).to(FileMongoRepository);
    container.bind<ILogRepository<ILogDomain>>(REPOSITORIES.ILogRepository).to(LogMongoRepository);
    container.bind<IItemRepository<IItemDomain>>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
}

/** OTHERS Repositories */
container.bind<ITokenRepository>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);
container.bind<INotificationRepository>(REPOSITORIES.INotificationRepository).to(NotificationSqlRepository);

export default container;