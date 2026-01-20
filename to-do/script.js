document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const addButton = document.getElementById('add-btn');

    const task = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        task.push(todoItem);
        saveTasks();
        renderTasks();
        todoInput.value = '';
    });

    function renderTasks() {
        todoList.innerHTML = ''; // clear first

        task.forEach(item => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span style="text-decoration: ${item.completed ? 'line-through' : 'none'};">${item.text}</span>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            `;
            todoList.appendChild(li);
        });
        
    }
    todoList.addEventListener('click', (e) => {
        console.log(e);
        const li = e.target.closest('li'); // find the clicked li
    if (!li) return; // clicked outside a list item
    const id = Number(li.querySelector('.delete-btn').dataset.id);
    
        // const id = Number(e.target.dataset.id);
        console.log(id);
        if (e.target.classList.contains('delete-btn')) {
            

            const index = task.findIndex(item => item.id === id);
            if (index !== -1) {
                task.splice(index, 1);
                saveTasks();
                renderTasks(); // re-render safely
            }
        }
        // COMPLETE TASK
        const index = task.findIndex(item => item.id === id);
        if (index !== -1) {
            task[index].completed = !task[index].completed; // toggle
            saveTasks();
            renderTasks();
        }
    });
   

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(task));
    }
});
