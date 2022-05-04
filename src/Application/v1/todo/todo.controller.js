import ToDoModel from './todo.model';

export const getAllTodo = async (req, res) => {
  const { state = 'active,draft' } = req.query;

  const stateArray = state?.split(',');

  try {
    const data = await ToDoModel.find({ status: stateArray });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createTodo = async (req, res) => {
  const { content, user } = req.body;

  if (!content || !user) {
    return res.status(400).json({
      message:
        'Faltan datos, la consulta debe contener content y user',
      code: 400,
    });
  }

  try {
    const data = await ToDoModel.create({
      content,
      user
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
    const data = await ToDoModel.findByIdAndUpdate(userId, payload);
    return res.status(200).json({
      ...data,
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

  if (!userId) {
    return res.status(400).json({
      message: 'Por favor envie el id del recurso a eliminar',
      code: 400,
    });
  }

  try {
    await ToDoModel.findByIdAndUpdate(userId, { status: 'inactive' });
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
