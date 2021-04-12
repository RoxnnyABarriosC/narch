import {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import UserEntity from "../Domain/User.entity";

const UserMongoSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permissions: {type: Array, required: true},
    roles: [{type: Schema.Types.String, ref: 'Role'}],
    enable: {type: Boolean, required: true},
    isSuperAdmin: {type: Boolean, required: true},
    confirmationToken: {type: String},
    passwordRequestedAt: {type: Date}
}, {timestamps: true});

UserMongoSchema.loadClass(UserEntity);

export default UserMongoSchema;