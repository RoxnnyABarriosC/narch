import Config from "config";
import Fs from "fs";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import webPush from "web-push"
import path from "path";
import {ErrorException} from "@digichanges/shared-experience";

import EmailNotificationEntity from "../Entities/EmailNotification.entity";
import NotificationSqlRepository from "../Repositories/Notification.sql.repository";
import PushNotificationEntity from "../Entities/PushNotification.entity";

export default class Notificator
{
    public static async sendEmail(emailNotification: EmailNotificationEntity, templatePathNameFile: string, data: object = {}, save: boolean = true)
    {
        const repository = new NotificationSqlRepository();

        try {
            const host: string = Config.get('mail.host');
            const port: number = Config.get('mail.port');
            const secure: boolean = Config.get('mail.secure');
            const templateRoot: string = Config.get('mail.templateDir');
            const templateDir = path.dirname(require.main.filename || process.mainModule.filename) + `/${templateRoot}/${templatePathNameFile}`;

            let smtpConfig = {host, port, secure};

            if(smtpConfig.secure)
            {
                const auth = {
                                auth: {
                                        user: String(Config.get('mail.username')),
                                        pass: String(Config.get('mail.password'))
                                    }
                            };
                Object.assign(smtpConfig, auth);
            }

            emailNotification.senderName = Config.get('mail.senderName');
            emailNotification.from = Config.get('mail.senderEmailDefault');
            emailNotification.emailTemplatePath = templateDir;

            let transporter = nodemailer.createTransport(smtpConfig);

            const source = await Fs.readFileSync(templateDir).toString();

            const template = Handlebars.compile(source);

            const html = template(data);

            let mailData = {
                from: '"' + emailNotification.senderName + '" <' + emailNotification.from + '>',
                to:  emailNotification.to,
                subject: emailNotification.subject,
                html
            };

            if (emailNotification.cc)
            {
                Object.assign(mailData, {cc: emailNotification.cc});
            }

            return await transporter.sendMail(mailData)
                            .then((info: any) =>
                            {
                                if (save) {
                                    repository.save(emailNotification);
                                }

                                return true;
                            })
                            .catch((err: any) => {
                                if (save) {
                                    emailNotification.description = err;
                                    repository.save(emailNotification);
                                }
                                throw new ErrorException("Something is wrong. Please try again later.", "NotificatorException");
                            });
        } catch(e) {
            throw Error("Error to send Email");
        }
    }

    public static async sendPushNotification(pushNotification: PushNotificationEntity, message: string, save: boolean = true)
    {
        try {
            const publicKey: string = Config.get('push.publicKey');
            const privateKey: string = Config.get('push.privateKey');
            const subject: string = Config.get('url.urlWeb');

            const pushSubscription = pushNotification.getSubscription();

            const payload = JSON.stringify({
                name: pushNotification.name,
                message
            });

            const options = {
                vapidDetails: {
                    subject,
                    publicKey,
                    privateKey,
                },
            }

            const result = await webPush.sendNotification(pushSubscription, payload, options);

            return result;
        } catch(e) {
            throw Error("Error to send Push NotificationEntity");
        }
    }
}
