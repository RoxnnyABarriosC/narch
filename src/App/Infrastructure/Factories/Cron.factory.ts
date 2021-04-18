import TestCron from "../Cron/Test.cron";

export default class CronFactory
{
    public test: TestCron;

    constructor()
    {
        this.test = new TestCron('* * * * *');
    }

    start(): void
    {
        this.test.start();
    }
}
