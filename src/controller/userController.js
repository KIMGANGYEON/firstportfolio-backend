import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getAuth = async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    cart: req.user.cart,
    history: req.user.history,
  });
};

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

export const postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("해당 유저의 이메일을 찾을수 없습니다");
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("잘못된 비밀번호 입니다");
    }

    const payload = {
      userId: user._id.toHexString(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};

export const postLogout = async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postEdit = async (req, res, next) => {
  let { id, email, name } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).send("해당 유저를 찾을수 없습니다");
    }

    if (!email) {
      email = user.email;
    }

    if (email !== user.email) {
      const useremailExists = await User.exists({ email });
      if (useremailExists) {
        return res.status(400).send("해당 이메일은 다른 유저가 사용중 입니다");
      }
    }

    if (!name) {
      name = user.name;
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        name,
      },
      { new: true }
    );
    req.body = updateUser;
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postEditUserPassword = async (req, res, next) => {
  const { id, oldpassword, newpassword, newpassword2 } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).send("기존 비밀번호가 일차하지 않습니다");
    }

    if (oldpassword === newpassword) {
      return res.status(400).send("이전 비밀번호와 일치합니다");
    }

    if (newpassword !== newpassword2) {
      return res.status(400).send("새로운 비밀번호가 일치하지 않습니다");
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
