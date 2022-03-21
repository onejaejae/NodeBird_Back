import passport from "passport";
import UserService from "../services/userService";

export const createUser = async (req, res, next) => {
  try {
    const userDTO = req.body;
    const { email, nickname } = await new UserService().Signup(userDTO);

    return res.status(201).json({ success: true, data: { email, nickname } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
};
