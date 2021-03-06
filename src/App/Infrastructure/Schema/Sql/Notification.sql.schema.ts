import { EntitySchema } from "typeorm";
import {TypeNotificationEnum} from "@digichanges/shared-experience";
import TypeNotificationEntity from "../../Entities/TypeNotification.entity";

const TypeNotificationSqlSchema = new EntitySchema<TypeNotificationEntity>({
    name: "TypeNotificationEntity",
    target: TypeNotificationEntity,
    tableName: 'notifications',
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        emailTemplatePath: {
            type: String,
            nullable: true
        },
        senderName: {
            type: String,
            nullable: true
        },
        from: {
            type: String,
            nullable: true
        },
        to: {
            type: String,
            nullable: true
        },
        cc: {
            type: String,
            nullable: true
        },
        subject: {
            type: String,
            nullable: true
        },
        description: {
            type: String,
            nullable: true
        },
        url: {
            type: String,
            nullable: true
        },
        type: {
            type: "enum",
            enum: TypeNotificationEnum,
            default: TypeNotificationEnum.EMAIL
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true,
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true,
        }
    }
})

export default TypeNotificationSqlSchema;
