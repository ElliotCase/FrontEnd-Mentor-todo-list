const input = document.getElementById('todo-input');
const list = document.getElementById('todo-block');


// add to do function

function addToDo(toDo) {
    const position = "beforeEnd";
    const item = `<div class="current-todo">
    <button class="todo-button" type="submit"></button>
    <p class="todo-text">${toDo}</p>`

    list.insertAdjacentHTML(position, item);
}

// add item to list 
document.addEventListener()