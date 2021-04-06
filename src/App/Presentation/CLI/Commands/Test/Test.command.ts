import commander from 'commander';
import {loggerCli} from '../../../../Infrastructure/Shared/Logger';

const TestCommand = new commander.Command('test');

TestCommand
    .version('0.0.1')
    .description('Running commant test')
    .option('-n, --name <name>', 'Name of the test')
    .option('-s, --slug <slug>', 'Slug of the test')
    .action(async(env: any) =>
    {
        loggerCli.info(`Test ${env.name} created successfully. SLUG: ${env.slug}`);
    });

export default TestCommand;
