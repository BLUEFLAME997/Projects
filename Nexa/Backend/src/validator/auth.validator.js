import { body, validationResult } from "express-validator";

function validationFunction(req,res,next){
  const err = validationResult(req);
  if(err.isEmpty()){
    return next();
  }
  return res.status(400).json({
    Message:'Invalid credentials',
    success:false,
    error:err.array()
  })
}

export const registerValidator = [
  body('username')
      .isEmpty().withMessage('Username cannot be empty')
      .toString().withMessage('Username should be a valid string'),
  body('email')
      .trim()
      .isEmpty().withMessage('Email cannot be empty')
      .isEmail().withMessage('Should be a valid email address'),
  body('password')
      .trim()
      .isEmpty().withMessage('Password cannot be empty')
      .isLength({min:6,max:12}).withMessage('Password should be in a range 6 to 12 characters'),
  validationFunction
]

