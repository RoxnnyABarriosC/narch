import UserSqlSeed from "../../../User/Infrastructure/User.sql.seed";

export default class SqlSeedFactory
{
    private userSqlSeed: UserSqlSeed;

    constructor()
    {
        this.userSqlSeed = new UserSqlSeed();
    }

    public async init()
    {
        await this.userSqlSeed.authInit();
    }
}
