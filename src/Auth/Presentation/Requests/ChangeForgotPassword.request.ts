import * as express from "express";
import Config from "config";
import {IsString, Length} from "class-validator";
import ChangeForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeForgotPassword.payload";
import {Match} from "../../../App/Infrastructure/Shared/Decorators/match";
import IEncryption from "../../../App/InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";

export default class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    password: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @Match('password', {message: "passwordConfirmation don't match"})
    passwordConfirmation: string;

    @IsString()
    confirmationToken: string;

    constructor(request: express.Request)
    {
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.confirmationToken = request.body.confirmationToken;
    }

    getConfirmationToken(): string
    {
        return this.confirmationToken;
    }

    async getPassword(): Promise<string>
    {
        let encryption: IEncryption = EncryptionFactory.create();

        return await encryption.encrypt(this.password);
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }
}
