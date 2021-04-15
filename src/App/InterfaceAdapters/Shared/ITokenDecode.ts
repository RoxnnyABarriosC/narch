
export default interface ITokenDecode
{
    id: string;
    iss: string;
    aud: string;
    sub: string;
    iat: number;
    exp: number;
    userId: string;
    email: string;
}


