const { Schema, models, model } = require('mongoose');
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error('password must be at least 5 characters');
          return false;
        }
      },
    },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.post('validate', function (user) {
  const pass = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(pass, salt);
});

export const User = models?.User || model('User', UserSchema);
