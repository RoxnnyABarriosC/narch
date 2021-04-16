import { EntitySchema } from "typeorm";
import UserEntity from "../Domain/User.entity";

const UserSqlSchema = new EntitySchema<UserEntity>({
    name: "UserEntity",
    target: UserEntity,
    tableName: 'users',
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        enable: {
            type: Boolean,
            default: true,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        confirmationToken: {
            type: String,
            nullable: true
        },
        passwordRequestedAt: {
            type: Date,
            nullable: true
        },
        permissions: {
            type: 'simple-array',
            nullable: true
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
        },
        deletedAt: {
            name: 'deletedAt',
            type: 'timestamp with time zone',
            nullable: true,
        },
    },
    relations: {
        roles: {
            type: 'many-to-many',
            target: 'RoleEntity',
            eager: true,
            joinTable: {
                name: 'users_has_roles',
                joinColumn: {
                    name: 'user_id'
                },
                inverseJoinColumn: {
                    name: 'role_id'
                }
            }
        },
        mainPicture: {
            type: 'one-to-one',
            target: 'FileEntity',
            joinColumn: true,
            nullable: true,
            eager: true,
        }
    },
});

export default UserSqlSchema;
