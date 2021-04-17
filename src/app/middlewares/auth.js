import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import { promisify } from 'util';

export default async (req, res, next)=>{
  const authHeader = req.headers.authorization;
  //verificar se o usuário possue jwt 
  if (!authHeader){
    return res.status(401).json({ error: 'Token not provided'});
  }
  
  // fazendo a desestruturação do array ele descarta a primeira posição
  // que seria a palavra Bearer
  const [, token] = authHeader.split(' ');

  try{
   
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
  
    req.userId = decoded.id;

    return next();
    
  }catch (err){
    return res.status(401).json({error: 'Token invalid'});
    
    
  
  }

  

};