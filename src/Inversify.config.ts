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
import TokenRedisRepository from "./App/Infrastructure/Repositories/TokenRedis.repository";

import INotificationRepository from "./App/InterfaceAdapters/IRepository/INotificationRepository";
import NotificationSqlRepository from "./App/Infrastructure/Repositories/Notification.sql.repository";

/* IServices */
container.bind<IAuthService>(SERVICES.IAuthService).to(AuthService);

/** Libs */
container.bind<Responder>(Types.Responder).to(Responder);
container.bind<IFormatResponder>(Types.IFormatResponder).to(FormatResponder);

/** Repositories */
container.bind<IUserRepository<IUserDomain>>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
container.bind<IRoleRepository<IRoleDomain>>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
container.bind<IFileRepository<IFileDomain>>(REPOSITORIES.IFileRepository).to(FileSqlRepository);

container.bind<ITokenRepository>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);
container.bind<INotificationRepository>(REPOSITORIES.INotificationRepository).to(NotificationSqlRepository);

export default container;