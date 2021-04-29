import container from "../../../Container";
import {REPOSITORIES} from "../../../Repositories";
import InjectionFactory from "./Injection.factory";

export default class ContainerFactory
{
    static create<T>(type: string): T
    {
        return container.get<T>(type);
    }
}

export function containerFactory(serviceIdentifier: REPOSITORIES, doCache: boolean = true)
{
    return (proto: any, key: string): void => {
        let resolve = () => {
            return container.get(serviceIdentifier);
        };

        InjectionFactory._proxyGetter(proto, key, resolve, doCache);
    };
}
