import container from "./Container";

import {SERVICES} from "./Services";
import {Types} from "./Types";
import {REPOSITORIES} from "./Repositories";

import IAuthService from "./App/InterfaceAdapters/IServices/IAuthService";
import AuthService from "./App/Infrastructure/Services/Auth.service";

import Responder from "./App/Presentation/Shared/Responder";
import IFormatResponder from "./App/InterfaceAdapters/Shared/IFormatResponder";
import FormatResponder from "./App/Presentation/Shared/FormatResponder";

import IUserRepository from "./User/InterfaceAdapters/IUser.repository";
import UserSqlRepository from "./User/Infrastructure/User.sql.repository";
import IUserDomain from "./User/InterfaceAdapters/IUser.domain";

import IRoleRepository from "./Role/InterfaceAdapters/IRole.repository";
import RoleSqlRepository from "./Role/Infrastructure/Role.sql.repository";
import IRoleDomain from "./Role/InterfaceAdapters/IRole.domain";

import IFileRepository from "./File/InterfaceAdapters/IFile.repository";
import FileSqlRepository from "./File/Infrastructure/File.sql.repository";
import IFileDomain from "./File/InterfaceAdapters/IFile.domain";

import {ITokenRepository} from "@digichanges/shared-experience";
import TokenRedisRepository from "./App/Infrastructure/Repositories/Redis/Token.redis.repository";

import INotificationRepository from "./App/InterfaceAdapters/IRepository/INotification.repository";
import NotificationSqlRepository from "./App/Infrastructure/Repositories/Sql/Notification.sql.repository";

import IItemRepository from "./Item/InterfaceAdapters/IItem.repository";
import IItemDomain from "./Item/InterfaceAdapters/IItem.domain";
import ItemMongoRepository from "./Item/Infrastructure/Item.mongo.repository";

/* IServices */
container.bind<IAuthService>(SERVICES.IAuthService).to(AuthService);

/** Libs */
container.bind<Responder>(Types.Responder).to(Responder);
container.bind<IFormatResponder>(Types.IFormatResponder).to(FormatResponder);

/** SQL Repositories */
container.bind<IUserRepository<IUserDomain>>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
container.bind<IRoleRepository<IRoleDomain>>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
container.bind<IFileRepository<IFileDomain>>(REPOSITORIES.IFileRepository).to(FileSqlRepository);

/** MONGO Repositories */
container.bind<IItemRepository<IItemDomain>>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);

/** OTHERS Repositories */
container.bind<ITokenRepository>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);
container.bind<INotificationRepository>(REPOSITORIES.INotificationRepository).to(NotificationSqlRepository);

export default container;