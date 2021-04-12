import {NextFunction, Request, Response} from "express";
import Config from "config";
import _ from "lodash";

import TokenExpiredHttpException from "../../../App/Presentation/Exceptions/TokenExpiredHttp.exception";
import TokenNotFoundHttpException from "../../../App/Presentation/Exceptions/TokenNotFoundHttp.exception";
import AuthService from "../../../App/Infrastructure/Services/Auth.service";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";

const AuthenticationMiddleware = async (req: Request | any, res: Response, next: NextFunction) =>
{
    try
    {
        let existMethodAndUrl = false;
        const apiWhitelist: {method: string[], url: string}[] = Config.get('apiWhitelist');

        apiWhitelist.forEach((conf) =>
        {
            if(conf.method.includes(req.method))
            {
                if(conf.url.indexOf('*') >= 0 && req.path.indexOf(conf.url.replace('*','')) >= 0)
                {
                    existMethodAndUrl = true;
                    return;
                }

                if(conf.url === req.path){
                    existMethodAndUrl = true;
                    return;
                }
            }
        });

        if(existMethodAndUrl)
        {
            next();
        }
        else
        {
            // Not exist the createToken in the Header
            let token = req.get('Authorization');

            if(_.isUndefined(token) || token.indexOf('Bearer') === -1)
            {
                throw new TokenExpiredHttpException();
            }

            let TokenArray = token.split(" ");
            const hash = _.get(TokenArray, 1);

            if(!hash || !token)
            {
                throw new TokenNotFoundHttpException();
            }

            const authService = new AuthService();

            const userRepository: IUserRepository<IUserDomain> = ContainerFactory.create<IUserRepository<IUserDomain>>(REPOSITORIES.IUserRepository);

            req.tokenDecode = authService.decodeToken(token);

            req.authUser = await userRepository.getOneBy({
                relations: ['roles'],
                where: {
                    _id: req.tokenDecode.userId
                }}, { initThrow: false });

            next();
        }
    }
    catch(error)
    {
        next(error);
    }
};

export default AuthenticationMiddleware;
