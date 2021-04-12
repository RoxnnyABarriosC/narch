import {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import RoleEntity from "../Domain/Role.entity";

const RoleMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
    slug: {type:String, required: true, unique: true},
    enable: {type:Boolean, required: true},
    permissions: {type:Array, required: true}
}, {timestamps: true});

RoleMongoSchema.loadClass(RoleEntity);

export default RoleMongoSchema;