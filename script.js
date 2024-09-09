document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Carrega tarefas do localStorage
    loadTasks();

    // Adiciona uma nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    // Função para adicionar uma nova tarefa
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Botão de conclusão
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        // Botão de deletar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        saveTasks();
    }

    // Função para salvar tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((taskItem) => {
            tasks.push({
                text: taskItem.textContent.replace('Excluir', '').trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            if (task.completed) {
                taskItem.classList.add('completed');
            }

            // Botão de conclusão
            taskItem.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            // Botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                saveTasks();
            });

            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    }
});
