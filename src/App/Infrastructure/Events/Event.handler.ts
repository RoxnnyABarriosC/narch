import {EventEmitter} from "events";
import UserCreatedEvent from "../../../User/Infrastructure/Event/UserCreated.event";
import ForgotPasswordEvent from "../../../Auth/Infrastructure/Event/ForgotPassword.event";
import SendMessageEvent from "./SendMessage.event";
import LoggerEvent from "./Logger.event";

export default class EventHandler extends EventEmitter
{
    private static instance: EventHandler;

    private constructor()
    {
        super();
        this.setListeners();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
          EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public execute(event: string | symbol, ...args: any[])
    {
        this.emit(event, ...args);
    }

    private setListeners()
    {
        this.on(UserCreatedEvent.USER_CREATED_EVENT, UserCreatedEvent.userCreatedListener);
        this.on(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, ForgotPasswordEvent.forgotPasswordListener);
        this.on(SendMessageEvent.SEND_MESSAGE_EVENT, SendMessageEvent.sendMessageListener);
        this.on(LoggerEvent.LOG_SAVE_EVENT, LoggerEvent.saveLogListener);
        this.on(LoggerEvent.LOG_UPDATE_EVENT, LoggerEvent.updateLogListener);
        this.on(LoggerEvent.LOG_REMOVE_EVENT, LoggerEvent.removeLogListener);
    }
}
