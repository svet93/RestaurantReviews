const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Logger = require('../../utils/logger');
const {
  User,
  Sequelize: { Op },
} = require('../../data');


const changePassword = async (req, res, next) => {
  const { password, newPassword, newPasswordConfirmed } = req.body;
  const cookieUser = req.user;

  try {
    if (newPassword !== newPasswordConfirmed) {
      res.status(400).send('Passwords do not match');
    }

    const user = await User.findOne({
      where: { user_id: { [Op.eq]: cookieUser.userId } },
    });
    if (!user) {
      return res.status(401).send('The password entered is wrong');
    }

    const isValid = await bcrypt.compare(password, user.password());

    if (!isValid) {
      return res.status(401).send('The password entered is wrong');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ changed: true });
  } catch (e) {
    Logger.error(e);
  }
  return res.status(500).send('Server error occured, try again later');
};

const refreshToken = async (req, res, next) => {
  try {
    const { user } = req;
    const nUser = {
      email: user.email,
      userId: user.userId,
      role: user.role,
    };
    const newToken = jwt.sign(nUser, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });
    return res.json({ token: newToken, user });
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server error occured, try again later');
};

module.exports = { changePassword, refreshToken };
