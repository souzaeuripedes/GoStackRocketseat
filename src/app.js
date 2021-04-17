import express from   'express' ;
import routes from  './routes' ; // p/ importar a rotas do arquivo route.js 
import './database';
import path from 'path';


class App{
  constructor(){
    this.server = express();
    this.middleswares();
    this.routes();
  }

  middleswares(){
    this.server.use(express.json());
    this.server.use(
      '/files', 
      express.static(path.resolve(__dirname,'..','temp','uploads'))
     );
  }

  routes(){
    this.server.use(routes); 
  }

} 

export default new App().server;