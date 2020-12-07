//Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const deleteToDo = document.querySelector('.x');
const filter = document.querySelector(".categories");
const left = document.querySelector(".leftItems")
const clear = document.querySelector(".clear")



checkLeft()

// event listeners
todoInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addTodo();
    }
});

todoList.addEventListener('click', deleteCheck);

filter.addEventListener("click", filterItems)


clear.addEventListener('click', clearCompleted)

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
    checkLeft();
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
        tick.classList.toggle('completed-tick');
    }
    checkLeft();
}




function clearCompleted(e) {
    for (let i = todoList.children.length - 1; i >= 0; i--) {
        if (
            todoList.children[i].children[0].classList.contains("completed-tick")
        ) {
            todoList.children[i].remove()
        };

        // itemContainer.selector.children[i].remove();
    }
}







function filterItems(event) {
    switch (event.target.classList[0]) {
        case "active":
            for (item of todoList.children) {
                if (item.children[0].classList.contains("completed-tick"))
                    item.style.display = "none";
                else item.style.display = "flex";
                checkLeft();

            }
            break;
        case "all":
            for (item of todoList.children) {
                item.style.display = "flex";
                checkLeft();

            }
            break;
        case "completed":
            for (item of todoList.children) {
                if (!item.children[0].classList.contains("completed-tick"))
                    item.style.display = "none";
                else {
                    item.style.display = "flex";
                    checkLeft();

                }
            }
            break;
    }
}


function checkLeft() {
    let leftItems = 0;
    for (let i = todoList.children.length - 1; i >= 0; i--) {
        if (todoList.children[i].children[0].classList.contains("completed-tick")) continue;
        leftItems++;
    }
    left.innerHTML = `${leftItems} items left`;
}
