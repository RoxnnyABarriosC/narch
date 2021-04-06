import {Request} from "express";
import {IsString} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import ChangeUserPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeUserPassword.payload";

export default class ChangeUserPasswordRequest extends IdRequest implements ChangeUserPasswordPayload
{
    @IsString()
    newPassword: string;

    @IsString()
    newPasswordConfirmation: string;

    constructor(request: Request | any)
    {
        super(request);
        this.newPassword = request.body.newPassword;
        this.newPasswordConfirmation = request.body.newPasswordConfirmation;
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

