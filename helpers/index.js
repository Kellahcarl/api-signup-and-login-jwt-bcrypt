const Joi = require("joi");
const bcrypt = require("bcryptjs");

//const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/;
const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function signUpValidation(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().regex(pattern),
    confirmpassword: Joi.string().min(8).required(),
  });
 // "^[a-zA-Z0-9.!@#$%&]+$"
 //'^[a-zA-Z0-9!@#$%]{8,30}$'
  return schema.validate(user);
}


const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

module.exports = {signUpValidation, encryptPassword};