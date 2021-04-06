import IStatusCode from "../InterfaceAdapters/IPresentation/IStatusCode";
import {ValidationError} from "class-validator";

export default class ErrorHttpException extends Error
{
    private _statusCode: IStatusCode;
    private _errors: ValidationError[];
    public _metadata: {};

    constructor(statusCode: IStatusCode, message: string, errors: ValidationError[], metadata: {} = null)
    {
        super();
        this._statusCode = statusCode;
        this._errors = errors;
        this.message = message;
        this._metadata = metadata;
    }

    public get statusCode() : IStatusCode
    {
        return this._statusCode;
    }

    public set statusCode(value: IStatusCode)
    {
        this._statusCode = value;
    }

    public get errors() : ValidationError[]
    {
        return this._errors;
    }

    public set errors(err: ValidationError[])
    {
        this._errors = err;
    }

    public set metadata(metadata: {})
    {
        this._metadata = metadata
    }

    public get metadata(): {}
    {
        return this._metadata
    }
}
