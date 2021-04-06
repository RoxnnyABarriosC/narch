import {NextFunction, Response} from 'express';
import Config from 'config';
import AuthService from "../../Infrastructure/Services/Auth.service";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import ContainerFactory from "../../Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import ForbiddenHttpException from "../Exceptions/ForbiddenHttp.exception";

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async (req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const authService = new AuthService();

            let handlerPermission = handlerPermissions[0];
            let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
            let tokenDecode = req.tokenDecode;

            let userRepository: IUserRepository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);

            let user: IUserDomain = await userRepository.getOneBy({email:tokenDecode.email});

            if (user.isSuperAdmin)
            {
                isAllowed = true;
            }

            let totalPermissions = authService.getPermissions(user);

            totalPermissions.forEach( (permission: string) =>
            {
                if (permission === handlerPermission)
                {
                    isAllowed = true;
                }
            });

            if (isAllowed)
            {
                next();
            }
            else
            {
                throw new ForbiddenHttpException();
            }
        }
        catch(err)
        {
            next(err);
        }
    }
};

export default AuthorizeMiddleware;
