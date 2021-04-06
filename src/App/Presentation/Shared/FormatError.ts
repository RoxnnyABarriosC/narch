import _ from "lodash";
import {StatusCode} from "@digichanges/shared-experience";
import ErrorHttpException from "../../Shared/ErrorHttpException";
import ValidationModel from "../../Shared/ValidationModel";

export default class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        let {statusCode, message, errors} = errorHttpException;
        let validationModels: ValidationModel[] = [];

        if (!_.isEmpty(errors))
        {
            for (const error of errors)
            {
                const validationModel = new ValidationModel(error);
                validationModels.push(validationModel);
            }
        }

        return {
            status: statusCode.status,
            code: statusCode.code,
            statusCode: statusCode.statusCode,
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errors: _.isEmpty(validationModels) ? null : validationModels
        };
    };
}