const bcrypt = require("bcryptjs");
const { getUserDb, createUserDb } = require("../../db/user.db");
const apiResponse = require("../../utils/apiResponse");
const APIStatus = require("../../constants/APIStatus");
const genToken = require("../../utils/genToken");
const hashPassword = require("../../utils/hashPassword");



const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await getUserDb({ username });
  if (!user) {
    return res.status(400).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: "Username or password wrong",
      })
    );
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = genToken(user);
      const { password, _id, ...info } = user._doc;
      return res.status(200).json(
        apiResponse({
          status: APIStatus.SUCCESS,
          data: { token, role: user.role, userId: user._id },
        })
      );
    }
    if (err) {
      return res
        .status(500)
        .json(
          apiResponse({ status: APIStatus.ERROR, msg: "Internal Server Error" })
        );
    }
    return res.status(400).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: "Username or password wrong",
      })
    );
  });
};

const register = async (req, res, next) => {
  const { email, username, password, fullName } = req.body;
  const [user1, user2] = await Promise.all([
    getUserDb({ email }),
    getUserDb({ username }),
  ]);
  if (user1 || user2) {
    return res.status(409).json(
      apiResponse({
        status: APIStatus.FAIL,
        msg: "email or username existed",
      })
    );
  }

  const hashedPw = await hashPassword(password);
  const user = await createUserDb({
    email,
    username,
    password: hashedPw,
    fullName,
  });
  if (!user)
    return res
      .status(400)
      .json(
        apiResponse({ status: APIStatus.ERROR, msg: "can not create new user" })
      );

  const token = genToken(user);
  return res
    .status(200)
    .json(apiResponse({ status: APIStatus.SUCCESS, data: { token } }));
};



module.exports = {
  login,
  register
};
