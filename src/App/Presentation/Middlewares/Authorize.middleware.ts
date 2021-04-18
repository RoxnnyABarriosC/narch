import {NextFunction, Response} from 'express';
import Config from 'config';
import AuthService from "../../../Auth/Infrastructure/Services/Auth.service";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import ForbiddenHttpException from "../Exceptions/ForbiddenHttp.exception";
import _ from "lodash";
import Permissions from "../../../Config/Permissions";

const AuthorizeMiddleware = (...handlerPermissions: any) =>
{
    return async (req: any, response: Response, next: NextFunction) =>
    {
        try
        {
            const authService = new AuthService();

            let handlerPermission = handlerPermissions[0];
            let isAllowed: boolean = Config.get('auth.authorization') !== 'true';
            let authUser: IUserDomain = req.authUser;

            if ( authUser.isSuperAdmin ) isAllowed = true;

            const userPermissions: IUserDomain = _.cloneDeep<IUserDomain>(authUser)

            let totalPermissions = authService.getPermissions(userPermissions);

            _.map(totalPermissions, (permission: string) => {
                if ( permission === handlerPermission || permission === Permissions.ALL) isAllowed = true;
            });

            if ( isAllowed )  next();

            else throw new ForbiddenHttpException();
        }
        catch(err)
        {
            next(err);
        }
    }
};

export default AuthorizeMiddleware;
