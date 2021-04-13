import UserSeed from "../../../User/Infrastructure/User.seed";

export default class SeedFactory
{
    private userSqlSeed: UserSeed;

    constructor()
    {
        this.userSqlSeed = new UserSeed();
    }

    public async init()
    {
        await this.userSqlSeed.authInit();
    }
}
