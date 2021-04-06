import {EntitySchema} from "typeorm";
import FileEntity from "../Domain/File.entity";

const FileSqlSchema = new EntitySchema<FileEntity>({
    name: "FileEntity",
    target: FileEntity,
    tableName: "files",
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        originalName: {
            type: String
        },
        mimeType: {
            type: String
        },
        path: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        version: {
            type: Number
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

export default FileSqlSchema;