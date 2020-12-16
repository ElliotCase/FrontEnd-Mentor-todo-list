//Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.getElementById('todo-list');
const todoList1 = document.querySelectorAll('.todo-list1');
const deleteToDo = document.querySelector('.delete-todo');
const filter = document.querySelector(".categories");
const left = document.querySelector(".leftItems")
const clear = document.querySelector(".clear")
const todo = document.querySelectorAll('.todo')
const todoText = document.querySelectorAll('.todo-text')
const newTodo = document.querySelector(".new-todo")
const active = document.querySelector(".active-2")
const completed = document.querySelector(".completed-1")
const all = document.querySelector(".all-1")


checkLeft()
localStorage.setItem("theme", "theme-dark");
localStorage.getItem("theme");
// event listeners
todoInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addTodo();
    }
});


active.addEventListener('click', activeState);
all.addEventListener('click', allState);
completed.addEventListener('click', completedState);

todoList.addEventListener('click', deleteCheck);

filter.addEventListener("click", filterItems)


clear.addEventListener('click', clearCompleted)



// functions


function addTodo() {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newButton = document.createElement('button');
    newButton.classList.add('todo-button')
    const newLine = document.createElement('div')
    newLine.classList.add('line')
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-text')
    const newDelete = document.createElement('button');
    newDelete.innerHTML = '<i class="fas fa-times "></i>'
    newDelete.classList.add('delete-todo')
    todoList.appendChild(todoDiv)
    todoDiv.appendChild(newButton)
    todoDiv.appendChild(newLine)
    newLine.appendChild(newTodo)
    newLine.appendChild(newDelete)
    var att = document.createAttribute("draggable");
    att.value = "true";
    todoDiv.setAttributeNode(att);
    todoDiv.addEventListener('dragstart', () => { todoDiv.classList.add('dragging') })
    todoDiv.addEventListener('dragend', () => {
        todoDiv.classList.remove('dragging')
    })
    // clear todo input value
    todoInput.value = ''
    checkLeft();
}


todo.forEach(todo => {
    todo.addEventListener('dragstart', () => {
        todo.classList.add('dragging')
    })
    todo.addEventListener('dragend', () => {
        todo.classList.remove('dragging')
    })
})

todoList1.forEach(todoList1 => {
    todoList1.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(todoList1, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            todoList1.appendChild(draggable)
        } else {
            todoList1.insertBefore(draggable, afterElement)
        }
    })
})


function getDragAfterElement(todoList1, y) {
    const draggableElements = [...todoList1.querySelectorAll('.todo:not(.dragging)')];


    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}


function activeState() {
    active.previousElementSibling.classList.toggle('label-color')
    all.previousElementSibling.classList.remove('label-color')
    completed.previousElementSibling.classList.remove('label-color')

}

function allState() {
    active.previousElementSibling.classList.remove('label-color')
    all.previousElementSibling.classList.toggle('label-color')
    completed.previousElementSibling.classList.remove('label-color')

}


function completedState() {
    active.previousElementSibling.classList.remove('label-color')
    all.previousElementSibling.classList.remove('label-color')
    completed.previousElementSibling.classList.toggle('label-color')

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
    if (item.classList[0] === 'todo-text') {
        const tick = item
        tick.classList.toggle('completed');
    }

    if (item.classList[0] === 'todo') {
        const todo = item.firstElementChild.nextElementSibling.firstElementChild
        todo.classList.toggle('completed');
    }

    if (item.classList[0] === 'line') {
        const todo = item.firstElementChild
        todo.classList.toggle('completed');
    }


    if (item.classList[0] === 'todo-button') {
        const tick = item
        tick.classList.toggle('active');

    }

    if (item.classList[0] === 'todo-text') {
        const todoo = item.parentElement.previousElementSibling;
        todoo.classList.toggle('active')
    }
    if (item.classList[0] === 'todo') {
        const todoo = item.firstElementChild;
        todoo.classList.toggle('active');
    }
    if (item.classList[0] === 'line') {
        const todoo = item.previousElementSibling;
        todoo.classList.toggle('active');
    }
    checkLeft();
}




function clearCompleted(e) {
    for (let i = todoList.children.length - 1; i >= 0; i--) {
        if (
            todoList.children[i].children[0].classList.contains("active")
        ) {
            todoList.children[i].remove()
        };

        // itemContainer.selector.children[i].remove();
    }
}







function filterItems(event) {
    switch (event.target.classList[0]) {
        case "active-1":
            for (item of todoList.children) {
                if (item.children[0].classList.contains("active"))
                    item.style.display = "none";
                else {
                    item.style.display = "flex";

                    checkLeft();
                }
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
                if (!item.children[0].classList.contains("active"))
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
        if (todoList.children[i].children[0].classList.contains("active")) continue;
        leftItems++;
    }
    left.innerHTML = `${leftItems} items left`;
}





const lightMode = document.getElementById('light-mode-1')

lightMode.addEventListener('click', function () {
    lightMode.classList.remove('remove')
    if (toggleTheme() === "dark") {
        this.classList = "sun";
    } else {
        this.classList = "moon";
    }
})

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        return "light";
    } else {
        setTheme('theme-dark');
        return "dark";
    }
}


function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}


(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();



