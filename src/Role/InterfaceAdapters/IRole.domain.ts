import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";

export default interface IRoleDomain extends IBaseEntityDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];
}
