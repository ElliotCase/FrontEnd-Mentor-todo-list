//Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const deleteToDo = document.querySelector('.x');

// event listeners
todoInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addTodo();
    }
});


todoList.addEventListener('click', deleteCheck);




// functions

function addTodo() {
    // prevent form from submitting
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')


    const newButton = document.createElement('button');
    newButton.classList.add('todo-button')


    const newLine = document.createElement('div');
    newLine.classList.add('line')


    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-text')


    const newDelete = document.createElement('button');
    newDelete.innerHTML = '<i class="fas fa-times "></i>'

    newDelete.classList.add('x')

    todoList.appendChild(todoDiv)
    todoDiv.appendChild(newButton)
    todoDiv.appendChild(newLine)
    newLine.appendChild(newTodo)
    newLine.appendChild(newDelete)
    // clear todo input value
    todoInput.value = ''
}


function deleteCheck(e) {
    const item = e.target;

    if (item.classList[1] === "fa-times") {
        // e.target.parentElement.remove();
        const todo = item.parentElement.parentElement.parentElement;
        todo.remove();
    }

    if (item.classList[0] === 'todo-button') {
        const todo = item.nextElementSibling.firstElementChild
        todo.classList.toggle('completed');
    }
    if (item.classList[0] === 'todo-button') {
        const tick = item
        tick.classList.toggle('completedd');
    }
}