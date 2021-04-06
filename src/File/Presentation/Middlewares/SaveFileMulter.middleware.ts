import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => cb(null, '/tmp') ,
        filename: (req: any, file: any, cb: any) => cb(null, file.originalname)
    }
);

const SaveFileMulterMiddleware = multer({storage});

export default SaveFileMulterMiddleware;
