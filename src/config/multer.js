import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..','..','tmp','uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res)=>{

        //cb = callback 
        if(err) return cb(err);

        //pega apenas a extensão do arquivo que o usuário adicionou 
        // hex é par converter os bits para hexadecimal
        return cb(null, res.toString('hex') + extname(file.originalname))
      });
    },
  }),
};