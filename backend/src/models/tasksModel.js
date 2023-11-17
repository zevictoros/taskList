const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at, tecnico) values (?, ?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC, '']);
    return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, status, marked_to } = task;

    const query = 'UPDATE tasks SET title = ?, status = ?, marked_to = ? WHERE id = ?';
    const updatedTask = await connection.execute(query, [title, status, marked_to, id]);
    return updatedTask;
};

const updateTecnico = async (id, task) => {
    const { title, status, tecnico } = task;

    const query = 'UPDATE tasks SET title = ?, status = ?, tecnico = ? WHERE id = ?';

    const updatedTecnico = await connection.execute(query, [title, status, tecnico, id]);
    return updatedTecnico;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
    updateTecnico,
};