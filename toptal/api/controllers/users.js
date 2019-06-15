const bcrypt = require('bcryptjs');
const {
  User,
  Sequelize: { Op },
} = require('../../data');
const Logger = require('../../utils/logger');

exports.getUsers = async (req, res) => {
  const users = await User.findAll({
    where: { active: 1 },
  });
  return res.json(users);
};

exports.createUsers = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userType,
    active,
  } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      user_type: userType,
      active,
    });

    return res.status(201).json(user);
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.deleteUsers = async (req, res) => {
  const {
    id,
  } = req.params;

  try {
    const user = await User.findOne({
      where: { user_id: { [Op.eq]: id } },
    });

    if (!user) {
      return res.status(404).send('Users not found');
    }

    await user.destroy();
    return res.status(200).send('Users deleted');
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};
