import md5 from "md5";
import DecryptForbiddenException from "../Exceptions/DecryptForbidden.exception";
import {IEncryption} from "@digichanges/shared-experience";

class Md5EncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await md5(chain) === chainHashed;
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string): Promise<string>
    {
       return md5(chain);
    }
}

export default Md5EncryptionStrategy;
