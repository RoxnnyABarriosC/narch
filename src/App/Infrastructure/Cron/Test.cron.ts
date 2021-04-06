import cron, {ScheduledTask} from 'node-cron';
import ICreateCron from "../../InterfaceAdapters/Shared/ICreateCron";

export default class TestCron implements  ICreateCron
{
    private scheduledTask: ScheduledTask;

    constructor(time: string = '* * * * * *')
    {
        this.scheduledTask = cron.schedule(time, async () => {
           console.log("CRON STARTING");
        });
    }

    start (): ScheduledTask
    {
        return this.scheduledTask.start();
    }

    stop (): ScheduledTask
    {
        return this.scheduledTask.stop();
    }

    destroy (): void
    {
        return this.scheduledTask.destroy();
    }
}