import IBaseEntityDomain from "../Shared/IBaseEntityDomain";

export default interface INotificationDomain extends IBaseEntityDomain
{
    name?: string;

    url?: string;

    emailTemplatePath?: string;
    senderName?: string;
    from?: string;
    to?: string;
    cc?: string;
    subject?: string;
    description?: string;

}
