import Filter from "../../../App/Presentation/Shared/Filter";
import RoleFilter from "../../../Role/Presentation/Criterias/Role.filter";

export default class UserFilter extends  Filter
{
    static readonly EMAIL: string = 'email';
    static readonly ENABLE: string = 'enable';
    static readonly IS_SUPER_ADMIN: string = 'isSuperAdmin';
    static readonly ROLE_NAME: string = RoleFilter.NAME;
    static readonly ROLE_SLUG: string = RoleFilter.SLUG;
    static readonly ROLE_ENABLE: string = 'roleEnable';

    getFields(): any
    {
        return [
            UserFilter.EMAIL,
            UserFilter.ENABLE,
            UserFilter.ROLE_NAME,
            UserFilter.ROLE_SLUG,
            UserFilter.ROLE_ENABLE,
            UserFilter.IS_SUPER_ADMIN,
        ];
    }

    getDefaultFilters(): any
    {
        return [
            {[UserFilter.IS_SUPER_ADMIN]: false}
        ];
    }
}