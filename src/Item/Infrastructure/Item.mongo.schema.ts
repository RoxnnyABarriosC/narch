import {Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import ItemEntity from "../Domain/Item.entity";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ItemMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
    createdBy: {type: Schema.Types.String, ref: 'User', autopopulate: true, required: true},
    updatedBy: {type:Schema.Types.String, ref: 'User', autopopulate: true, required: true},
}, {timestamps: true});

ItemMongoSchema.loadClass(ItemEntity);
ItemMongoSchema.plugin(mongooseAutoPopulate);


export default ItemMongoSchema;