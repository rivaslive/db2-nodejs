import encryptPassword from '@utils/encrypt';
import auth from '@utils/auth';
import UserModel from './user.model';

export const getAllUser = async (req, res) => {
  try {
    const data = await UserModel.find({ status: 'active' });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  const newPassword = await encryptPassword.create(password);

  if (!newPassword) {
    return res.status(500).json({
      message: 'Error to generate password',
      code: 500,
    });
  }

  try {
    const data = await UserModel.create({
      fullName,
      email,
      password: newPassword,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al insertar el registro',
      code: 500,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await UserModel.findOne({ email }).select('+password');

    if (!data) {
      return res.status(404).json({
        message: 'User not found',
        code: 404,
      });
    }

    const isValidPassword = await encryptPassword.valid(
      password,
      data.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Email or password is not correct!',
        code: 400,
      });
    }
    const newData = data.toJSON();

    const jwt = await auth.create(newData);
    return res.status(200).json({
      ...newData,
      jwt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al insertar el registro',
      code: 500,
    });
  }
};

export const updateUser = async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      message: 'Faltan datos o no a enviado el ID',
      code: 400,
    });
  }

  try {
    const data = await UserModel.findByIdAndUpdate(userId, payload);
    return res.status(200).json({
      ...data._doc,
      ...payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al insertar el registro',
      code: 500,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.findByIdAndUpdate(userId, { status: 'inactive' });
    return res.status(200).json({
      message: 'Usuario eliminado',
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al actualizar el registro',
      code: 500,
    });
  }
};
