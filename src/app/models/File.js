
import Sequelize, { Model } from 'sequelize';

//os campos do model não precisam ser iguais aos do BD
class File extends Model{
  static init (sequelize){ // recebe a conexão do arquivo index, dentro da pasta DB
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get(){
          return `http://localhost:3333/files/${this.path}`;
        },
      },
     
    },
    {
      sequelize,
    }
    );
  
  
  return this;
  }

}
export default File; 