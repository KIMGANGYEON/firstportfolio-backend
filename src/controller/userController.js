import User from "../models/User";

export const postJoin = async (req, res, next) => {
  const { email, password, password2 } = req.body;
  try {
    if (password != password2) {
      return res.status(401).send("비밀번호가 일치하지 않습니다");
    }

    const useremailExists = await User.exists({ email });
    if (useremailExists) {
      return res.status(401).send("해당 이메일은 다른 유저가 사용중 입니다");
    }

    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
