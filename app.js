//Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const deleteToDo = document.querySelector('.x');
const filter = document.querySelector(".categories");
const left = document.querySelector(".leftItems")
const clear = document.querySelector(".clear")
const todo = document.querySelectorAll('.todo')
const todoText = document.querySelectorAll('.todo-text')
const newTodo = document.querySelector(".new-todo")
const active = document.querySelector(".active-1")
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



// lightMode.addEventListener('click', switchToLight)
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


function activeState() {
    active.nextElementSibling.classList.toggle('label-color')
    all.nextElementSibling.classList.remove('label-color')
    completed.nextElementSibling.classList.remove('label-color')

}

function allState() {
    active.nextElementSibling.classList.remove('label-color')
    all.nextElementSibling.classList.toggle('label-color')
    completed.nextElementSibling.classList.remove('label-color')

}


function completedState() {
    active.nextElementSibling.classList.remove('label-color')
    all.nextElementSibling.classList.remove('label-color')
    completed.nextElementSibling.classList.toggle('label-color')

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



// function switchToLight() {
//     document.body.classList.toggle('light-body');
//     newTodo.classList.toggle('light-body');

//     for (let i = 0; i < todo.length; i += 1) {
//         todo.item(i).classList.toggle("light-body");
//     }
//     for (let i = 0; i < todoText.length; i += 1) {
//         todoText.item(i).classList.toggle("light-text");
//     }
// }

const lightMode = document.getElementById('light-mode')

lightMode.addEventListener('click', function () {
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


//init
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();



