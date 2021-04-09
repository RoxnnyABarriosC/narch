import {Request} from "express";
import moment from "moment";
import Config from "config";
import {IsEmail} from "class-validator";
import ForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ForgotPassword.payload";
import IEncryption from "../../../App/InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";

export default class ForgotPasswordRequest implements ForgotPasswordPayload
{
    @IsEmail()
    email: string;

    constructor(request: Request | any)
    {
        this.email = request.body.email;
    }

    getEmail(): string
    {
        return this.email;
    }

    async getConfirmationToken(): Promise<string>
    {
        let encryption: IEncryption = EncryptionFactory.create(Config.get('encryption.md5.type'));

        let stringToEncrypt = this.email + moment().utc().unix();

        return await encryption.encrypt(stringToEncrypt);
    }

    getPasswordRequestedAT(): Date
    {
        return moment().toDate();
    }
}
