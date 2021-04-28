import UserSeed from "../../../User/Infrastructure/User.seed";

export default class SeedFactory
{
    private userSeed: UserSeed;

    constructor()
    {
        this.userSeed = new UserSeed();
    }

    public async init()
    {
        await this.userSeed.authInit();
    }
}
