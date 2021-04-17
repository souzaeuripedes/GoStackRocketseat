import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import databaseConfig from '../config/database';

const models = [User,File];

class Database{
  constructor(){
    this.init();
  }
  init(){ // faz a conexão com o BD 
    this.connection = new Sequelize(databaseConfig); // gera a conexão 
    //está sendo esperada dentro dos models 
   
    models.map(model => model.init(this.connection));  // refere-se [User] função map percorre todo o array
    
    models.map(model => model.associate && model.associate(this.connection.models));
  
  } // importar esse arquivo para o app.js import './database';
}  

export default new Database(); 