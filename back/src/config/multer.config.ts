import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';

export const UPLOADS_FOLDER = 'C:/Users/pauli/Documents/Dev/uploads';

export const multerConfig = (folder: string) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(UPLOADS_FOLDER, folder);
      mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, callback) => {
      const uuid = uuidv4();
      const extension = extname(file.originalname);
      callback(null, `${uuid}${extension}`);
    },
  }),
});
