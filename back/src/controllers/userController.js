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
