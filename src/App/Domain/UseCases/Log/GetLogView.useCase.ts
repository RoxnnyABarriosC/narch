import * as path from 'path';
import fs from 'fs';

export default class GetLogViewUseCase
{
    handle(): any
    {
        const viewRoute = path.join(__dirname, '../../../../logs');
        let rawdata: string = fs.readFileSync(`${viewRoute}/error.log`, { encoding: 'utf-8'});

        // split the contents by new line
        const lines: string[] = rawdata.split(/\r?\n/);

        const data: any[] = [];

        lines.forEach((line) => {
            if (line.includes(`{"code":500`)) {
                const error = JSON.parse(line);
                data.unshift(error)
            }
        });

        return data;
    }
}
