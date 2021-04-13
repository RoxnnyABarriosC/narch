import {EntitySchema} from "typeorm";
import LogEntity from "../Domain/Log.entity";

const LogSqlSchema = new EntitySchema<LogEntity>({
    name: "LogEntity",
    target: LogEntity,
    tableName: "logs",
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        action: {
            type: "varchar"
        },
        entity: {
            type: "varchar"
        },
        entityId: {
            type: "varchar"
        },
        description: {
            type: "varchar"
        },
        metadata: {
            type: "json",
            nullable: true,
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
    },
    relations: {
        createdBy: {
            type: "many-to-one",
            target: "UserEntity",
            joinColumn: true,
            eager: true,
        }
    }
});

export default LogSqlSchema;