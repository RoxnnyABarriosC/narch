import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";

export default interface IAuthService
{
    decodeToken (token: string): any;
    getPermissions(user: IUserDomain): string[];
    validatePermissions(permissions: string[]): void;
    validatePermissions(permissions: string[]): void;
    addTokenBackList(tokenId: string): Promise<void>;
}

