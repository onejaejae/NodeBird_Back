const { User } = require("../../models");
import bcrypt from "bcrypt";
import throwError from "../utils/throwError";

export default class UserService {
  async exUser(email) {
    try {
      const exUser = await User.findOne({
        where: {
          email: email,
        },
      });

      return exUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdUser(id) {
    try {
      const user = await User.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Signup({ email, password, nickname }) {
    try {
      const user = await new UserService().exUser(email);

      if (user) {
        throw throwError(403, "이미 사용중인 아이디입니다");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        email,
        nickname,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
