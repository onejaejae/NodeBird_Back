const { User } = require("../../models");
import bcrypt from "bcrypt";
import throwError from "../utils/throwError";

export default class UserService {
  async Signup({ email, password, nickname }) {
    try {
      const exUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (exUser) {
        throw throwError(403, "이미 사용중인 아이디입니다");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        nickname,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
