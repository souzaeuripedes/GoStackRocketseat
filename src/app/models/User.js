
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

//os campos do model não precisam ser iguais aos do BD
class User extends Model{
  static init (sequelize){ // recebe a conexão do arquivo index, dentro da pasta DB
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, // esse campo esse só aqui e não no BD
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,

    },
    {
      sequelize,
    }
    );
  
  // beforSave indica q este trecho será executado antes de o dado ser salvo no BD
  this.addHook('beforeSave', async user => {
    if (user.password){
      user.password_hash = await bcrypt.hash(user.password, 10);
      console.log(user.password);
    }
  }); 

  return this;
  }

  static associate(models){
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar'});
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User; 