import {EntitySchema} from "typeorm";
import RoleEntity from "../Domain/Role.entity";

const RoleSqlSchema = new EntitySchema<RoleEntity>({
    name: "RoleEntity",
    target: RoleEntity,
    tableName: "roles",
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
        },
        enable: {
            type: Boolean,
            default: true,
        },
        permissions: {
            type: 'simple-array',
            nullable: true
        },
        createdAt: {
            name: 'createdAt',
            type: 'datetime',
            createDate: true,
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'datetime',
            updateDate: true,
        }
    }
});

export default RoleSqlSchema;