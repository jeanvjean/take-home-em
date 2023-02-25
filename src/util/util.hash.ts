import * as bcrypt from 'bcrypt';
const saltRounds = 10;
import { sign, verify } from 'jsonwebtoken';

export default {
  hashSync: async (password: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },

  comparePassword: async (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  },

  signUser: async (user: object) => {
    return sign(
      {
        ...user,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
    );
  },

  verify: async (token: string) => {
    try {
      return verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return error;
    }
  },
};
