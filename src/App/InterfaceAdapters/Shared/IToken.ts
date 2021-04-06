export default interface IToken
{
    getExpires(): number;
    getHash(): string;
    getUser(): any;
}
