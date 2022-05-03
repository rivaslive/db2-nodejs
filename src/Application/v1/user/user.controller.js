import UserModel from './user.model';

export const getAllUser = async (req, res) => {
  try {
    const data = await UserModel.find({ status: 'active' });
    return res
      .status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: 'Error al obtener los datos',
        code: 500,
      });
  }
};

export const createUser = async (req, res) => {
  const {
    fullName,
    email,
    password
  } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({
        message: 'Faltan datos, la consulta debe contener fullName, email y password',
        code: 400,
      });
  }

  try {
    const data = await UserModel.create({
      fullName,
      email,
      password
    });
    return res
      .status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: 'Error al obtener los datos',
        code: 500,
      });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({
        message: 'Por favor envie el id del recurso a eliminar',
        code: 400,
      });
  }

  try {
    await UserModel.findByIdAndUpdate(id, { status: 'inactive' });
    return res
      .status(200)
      .json({
        message: 'Usuario eliminado',
        code: 200,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: 'Error al obtener los datos',
        code: 500,
      });
  }
};
