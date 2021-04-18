import {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import NotificationEntity from "../../Entities/Notification.entity";
import EmailNotificationEntity from "../../Entities/EmailNotification.entity";
import PushNotificationEntity from "../../Entities/PushNotification.entity";

const options = {discriminatorKey: 'kind', timestamps: true};

export const NotificationMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true}
}, options).loadClass(NotificationEntity);

export const EmailNotificationMongoSchema: any = new Schema({
    emailTemplatePath: {type: String, required: true},
    senderName: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    cc: {type: String, default : null},
    subject: {type: String, required: true},
    description: {type: String, default : null}
}, options).loadClass(EmailNotificationEntity);

export const PushNotificationMongoSchema: any = new Schema({
    url: {type: String, required: true}
}, options).loadClass(PushNotificationEntity);