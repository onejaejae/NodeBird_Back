import passport from "passport";
import UserService from "../src/services/userService";
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await new UserService().findByIdUser(id);
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
