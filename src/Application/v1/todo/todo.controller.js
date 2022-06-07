import ToDoModel, { statusToDoType } from './todo.model';

export const getAllTodo = async (req, res) => {
  const { state = 'active,draft' } = req.query;

  const stateArray = state?.split(',');

  try {
    const data = await ToDoModel.find({ status: stateArray }).populate('user', [
      'id',
      'fullName',
      'email',
    ]);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getTodoById = async (req, res) => {
  const { todoId } = req.params;
  const { raw = false } = req.query;

  try {
    const data = await ToDoModel.findById(todoId).populate('user', [
      'id',
      'fullName',
      'email',
    ]);
    if (raw) {
      return res.send(data.content);
    }
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

  try {
    const data = await ToDoModel.create({
      content,
      user,
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

export const updateTodo = async (req, res) => {
  const payload = req.body;
  const { todoId } = req.params;

  try {
    const data = await ToDoModel.findByIdAndUpdate(todoId, payload, {
      new: true,
    }).populate('user', ['id', 'fullName', 'email']);
    return res.status(200).json(data._doc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al insertar el registro',
      code: 500,
    });
  }
};

export const updateStateTodo = async (req, res) => {
  const { status } = req.body;
  const { todoId } = req.params;

  if (!statusToDoType.find((s) => s === status)) {
    return res.status(400).json({
      message: 'Por favor envié un status valido',
      code: 400,
    });
  }

  try {
    await ToDoModel.findByIdAndUpdate(
      todoId,
      { status },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: 'Actualización exitosa',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al insertar el registro',
      code: 500,
    });
  }
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    await ToDoModel.findOneAndDelete(todoId);
    return res.status(200).json({
      message: 'ToDo eliminado',
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
