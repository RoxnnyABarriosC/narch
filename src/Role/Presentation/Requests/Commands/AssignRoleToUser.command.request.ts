import {IsString} from 'class-validator';
import UserAssignRoleByPayload from "../../../../User/InterfaceAdapters/Payloads/UserAssignRoleBy.payload";

export default class AssignRoleToUserCommandRequest implements UserAssignRoleByPayload
{
    @IsString()
    private readonly slug: string;

    @IsString()
    private readonly email: string;

    constructor(env: any)
    {
        this.slug = env.slug;
        this.email = env.email;
    }

    getSlugRole(): string
    {
        return this.slug;
    }

    getEmail(): string
    {
        return this.email;
    }
}
