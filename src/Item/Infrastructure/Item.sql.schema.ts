import {EntitySchema} from "typeorm";
import ItemEntity from "../Domain/Item.entity";

const ItemSqlSchema = new EntitySchema<ItemEntity>({
    name: "ItemEntity",
    target: ItemEntity,
    tableName: "items",
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String
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
        },
        updatedBy: {
            type: "many-to-one",
            target: "UserEntity",
            joinColumn: true,
            eager: true,
        }
    }
});

export default ItemSqlSchema;