import Config from "config";
import {IsString, Length} from "class-validator";
import {Match} from "../../../App/Infrastructure/Shared/Decorators/match";
import ChangeMyPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeMyPassword.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";

export default class ChangeMyPasswordRequest extends AuthUserRequest implements ChangeMyPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    currentPassword: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    newPassword: string;

    @IsString()
    @Match('newPassword', {message: "newPassword don't match"})
    newPasswordConfirmation: string;

    constructor(request: Request | any)
    {
        super(request);
        this.currentPassword = request.body.currentPassword;
        this.newPassword = request.body.newPassword;
        this.newPasswordConfirmation = request.body.newPasswordConfirmation;
    }

    getCurrentPassword(): string
    {
        return this.currentPassword;
    }

    getNewPassword(): string
    {
        return this.newPassword;
    }

    getNewPasswordConfirmation(): string
    {
        return this.newPasswordConfirmation;
    }
}
