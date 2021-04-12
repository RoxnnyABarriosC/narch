import {Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import ItemEntity from "../Domain/Item.entity";

const ItemMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
    createdBy: {type:String, required: true},
    lastModifiedBy: {type:String, required: true},
}, {timestamps: true});

ItemMongoSchema.loadClass(ItemEntity);

export default ItemMongoSchema;