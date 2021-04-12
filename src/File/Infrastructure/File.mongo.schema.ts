import {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import FileEntity from "../Domain/File.entity";

const FileMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
    originalName: {type:String, required: true},
    mimeType: {type:String, required: true},
    path: {type:String},
    extension: {type:String, required: true},
    size: {type:Number, required: true},
    version: {type:Number, required:true}
}, {timestamps: true});

FileMongoSchema.loadClass(FileEntity);

export default FileMongoSchema;