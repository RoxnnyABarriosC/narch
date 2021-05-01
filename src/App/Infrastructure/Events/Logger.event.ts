import Logger, {ILogRemoveProps, ILogSaveProps, ILogUpdateProps} from "../Logger/Logger";

export default class LoggerEvent
{
    public static LOG_SAVE_EVENT: string = "LOG_SAVE_EVENT";
    public static LOG_UPDATE_EVENT: string = "LOG_UPDATE_EVENT";
    public static LOG_REMOVE_EVENT: string = "LOG_REMOVE_EVENT";

    public static saveLogListener = (props: ILogSaveProps) =>
    {
         Logger
            .save(props)
            .then((success) => success )
            .catch((error: any) => { throw Error(`Error when trying to save the log of the saved ${props.type}`) });
    }

    public static updateLogListener = (props: ILogUpdateProps) =>
    {
        Logger
            .update(props)
            .then((success) => success )
            .catch((error: any) => { throw Error(`Error when trying to save the log of the updated ${props.type}`) });
    }

    public static removeLogListener = (props: ILogRemoveProps) =>
    {
        Logger
            .remove(props)
            .then((success) => success )
            .catch((error: any) => { throw Error(`Error when trying to save the log of the removed ${props.type}`) });
    }
}