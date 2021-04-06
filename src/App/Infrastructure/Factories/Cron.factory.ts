import TestCron from "../Cron/Test.cron";

export default class CronFactory
{
    private test: TestCron;

    constructor()
    {
        this.test = new TestCron('0 */6 * * *');
    }

    start(): any
    {
        this.test.start();
    }
}
