import {ScheduledTask} from 'node-cron';

export default interface ICreateCron
{
    start(): ScheduledTask;
    destroy(): void;
    stop(): ScheduledTask;
}