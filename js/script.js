const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
    const response = await fetch('http://192.168.1.169:3333/tasks');
    const tasks = await response.json()
    return tasks;
};

const addTask = async (event) => {
    event.preventDefault();
    const task = { title: inputTask.value };
    await fetch('http://192.168.1.169:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    loadTasks();
    inputTask.value = ''
}

const deleteTask = async (id) => {
    await fetch(`http://192.168.1.169:3333/tasks/${id}`, {
        method: 'delete',
    });
    loadTasks();
}

const updateTask = async ({ id, title, status, marked_to }) => {
    await fetch(`http://192.168.1.169:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status, marked_to }),
    });
    loadTasks();
}

const updateTecnico = async ({ id, title, status, tecnico }) => {
    await fetch(`http://192.168.1.169:3333/tecnico/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, status, tecnico }),
    });
    loadTasks();
}

const updateDate = async ({ id, title, status, marked_to }) => {
    await fetch(`http://192.168.1.169:3333/date/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, status, marked_to }),
    });
    loadTasks();
}

const formatDate = (dateUTC) => {
    const options = { dateStyle: 'short', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag)
    if (innerText) {
        element.innerText = innerText;
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">pendente</option>
        <option value="em andamento">em andamento</option>
        <option value="concluido">concluido</option>
    `;
    const select = createElement('select', '', options);
    select.value = value;
    return select;
}

const createTecnico = (value) => {
    const optionsTecnico = `
        <option value="jose">jose</option>
        <option value="victor">victor</option>
        <option value="oliveira">oliveira</option>
        <option value="santos">santos</option>
    `;
    const selectTecnico = createElement('select', '', optionsTecnico);
    selectTecnico.value = value;
    return selectTecnico;
}

const createRow = (task) => {

    const { id, title, created_at, marked_to, status, tecnico } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdMarkedTo = createElement('td', formatDate(marked_to));
    const tdStatus = createElement('td');
    const tdTecnico = createElement('td');
    const tdActions = createElement('td');
    const select = createSelect(status);
    const selectTecnico = createTecnico(tecnico);

    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }))
    selectTecnico.addEventListener('change', ({ target }) => updateTecnico({ ...task, tecnico: target.value }))
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>')
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>')
    const editForm = createElement('form');
    const editFormDate = createElement('form');
    const editImput = createElement('input');
    const editImputDate = createElement('input');
    editImputDate.type = 'datetime-local'

    editImput.value = title;
    editImputDate.value = marked_to;

    editForm.appendChild(editImput);
    editFormDate.appendChild(editImputDate);
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = marked_to;
        updateTask({
            id,
            title: editImput.value,
            status,
            marked_to: editImputDate.value !== "" ? editImputDate.value : data
        });
    })
    editFormDate.addEventListener('change', (event) => {
        event.preventDefault();
        setTimeout(() => {
            const data = marked_to;
            updateTask({
                id,
                title: editImput.value,
                status,
                marked_to: editImputDate.value !== "" ? editImputDate.value : data
            });
        }, 3000);
    })
    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdMarkedTo.innerText = '';
        tdTitle.appendChild(editForm);
        tdMarkedTo.appendChild(editFormDate);
    })
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
    deleteButton.addEventListener('click', () => { deleteTask(id) });

    tdStatus.appendChild(select);
    tdTecnico.appendChild(selectTecnico);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdMarkedTo);
    tr.appendChild(tdStatus);
    tr.appendChild(tdTecnico);
    tr.appendChild(tdActions);
    return tr;
};

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);
loadTasks();