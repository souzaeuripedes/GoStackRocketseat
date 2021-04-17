import { Router } from 'express';

import UserController from './app/controllers/UserController'

import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/auth';

import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';

import ProviderController from './app/controllers/ProviderController';

const routes = new Router(); 

const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // o authMiddleware só vale para o que vem depois dele 

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

//rota para upload 
//criar um middleware para o upload 
routes.post('/files',upload.single('file'), FileController.store);

export default routes;