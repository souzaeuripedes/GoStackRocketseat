import jwt from 'jsonwebtoken'; 

import authConfig from '../../config/auth'

import User from '../models/User';

import * as Yup from 'yup';




class SessionController{
  

    async store(req, res){
    

      // valida os dados qdo o usuario for iniciar a sessão
      const schema = Yup.object().shape({
  
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
  
      });
  
  
      //se for falso vai entrar no if 
      if(!(await schema.isValid(req.body))){
        return res.status(400).json({ error: 'Validation Fails'});
      }

    const { email, password} = req.body;

    //verifica existe aquele email cadastrado
    const user = await User.findOne( { where: { email } });

    if(!user){
      //verifica caso não exista o user
      return res.status(401).json( { error: 'User not found'} );
    }

    //verifica se a senha está incorreta
    if(!(await user.checkPassword(password))){
      return res.status(401).json( { error: 'Password does not match'} );
    }

    const { id , name} = user;
    
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign( { id }, authConfig.secret,{
        expiresIn: authConfig.expiresIn,
      } ),
    });

  }
}

export default new SessionController();