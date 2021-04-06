import IStatusCode from "../IPresentation/IStatusCode";

export default interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode, metadata: any | null): any
}

