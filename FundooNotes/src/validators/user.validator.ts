import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {

  //Register validator
  public registervalidator = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstname: Joi.string()
        .min(2)
        .max(30)
        .required(),
        
    
      lastname: Joi.string()
        .min(2)
        .max(30)
        .required(),
        
    
      email: Joi.string()
        .email()
        .required(),
        
    
      password: Joi.string()
        .min(8)
        .required(),
        
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
  

  //Login validator 
  public loginvalidator = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({

      email: Joi.string()
      .email()
      .required(),
      
  
    password: Joi.string()
      .min(8)
      .required()

  });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  }


  // Validate email for forget password
  public emailValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
  });
  }
  next();
};


  // Validate reset password request (token and new password)
  public resetPasswordValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
  newPassword: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
  });
  }
  next();
  };

}

export default UserValidator;