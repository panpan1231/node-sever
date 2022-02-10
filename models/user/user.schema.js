var mongoose =require('mongoose')
var EmailValidator =require('../../validators/email.validator')
const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 16
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: EmailValidator
        }
      }
    }
  );

  module.exports = UserSchema