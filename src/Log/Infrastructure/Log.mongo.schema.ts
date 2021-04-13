import {Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import LogEntity from "../Domain/Log.entity";
import mongooseAutoPopulate from "mongoose-autopopulate";

const LogMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    action: {type: String, required: true},
    entity: {type: String, required: true},
    entityId: {type: String, required: true},
    description: {type: String, required: true},
    metadata: {type: {}},
    createdBy: {type: Schema.Types.String, ref: 'User', autopopulate: true, required: true},
}, {timestamps: true});

LogMongoSchema.loadClass(LogEntity);
LogMongoSchema.plugin(mongooseAutoPopulate);

export default LogMongoSchema;