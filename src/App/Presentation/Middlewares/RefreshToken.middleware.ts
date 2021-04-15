import KeepAliveUseCase from "../../../Auth/Domain/UseCases/KeepAlive.useCase";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";

const RefreshTokenMiddleware = async (req: any, response: any, next: any) =>
{
    try
    {
        const authUser: IUserDomain = req?.authUser ? req.authUser : null;
        const tokenId: string = req?.tokenDecode ? req.tokenDecode.id : null;

        if (tokenId && authUser)
        {
            const keepAliveUseCase = new KeepAliveUseCase();
            const payload = await keepAliveUseCase.handle({getAuthUser: () => authUser, getTokenId: () => tokenId});

            req.refreshToken = payload.getHash();
        }

        next();
    }
    catch(error)
    {
        next(error);
    }
};

export default RefreshTokenMiddleware;
