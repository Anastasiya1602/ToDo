let addTodo = document.querySelector('#add');
let inputNewTodo = document.querySelector('.header-input');
let listTodo = document.querySelector('#todo');
let todoItem = document.querySelector('.todo-item');
let completed = document.querySelector('#completed');
// let initialTodoItems = document.querySelectorAll('.text-todo');
// initialTodoItems.forEach(todo => {
//   todo.style.display = 'none';
// });

let newTodo = '';
let listOfNewTodos = [];

const mainFunction = () => {
  listTodo.innerHTML = '';
  completed.innerHTML = '';
  listOfNewTodos.forEach(item => {
    let cloneTodoItem = todoItem.cloneNode(true);
    cloneTodoItem.firstChild.nextSibling.textContent = item.name;
    let removeTask = cloneTodoItem.querySelector('.todo-remove');
    let doneTask = cloneTodoItem.querySelector('.todo-complete');

    removeTask.addEventListener('click', () => {
      functionRemove(item);
    });

    doneTask.addEventListener('click', () => {
      functionDone(item);
    });

    !item.completed ? listTodo.append(cloneTodoItem) : completed.append(cloneTodoItem);
  });
}

const addNewTodo = (task) => {
  if (task.length > 0) {
    let cloneTodoItem = todoItem.cloneNode(true);
    cloneTodoItem.firstChild.nextSibling.textContent = task;
    listTodo.append(cloneTodoItem);
    listOfNewTodos.push({
      id: listOfNewTodos.length,
      name: newTodo,
      completed: false
    });
    inputNewTodo.value = newTodo = '';
    mainFunction();
    saveToLocalStorage(); // Сохраняем данные в localStorage после добавления задачи
  }
}

const functionRemove = (itemTask) => {
  listOfNewTodos = listOfNewTodos.filter(item => {
    return item.id !== itemTask.id;
  });
  mainFunction();
  saveToLocalStorage(); // Сохраняем данные в localStorage после удаления задачи
}

const functionDone = (itemTask) => {
  listOfNewTodos.find(item => {
    if (item.id === itemTask.id) {
      item.completed = !item.completed;
    }
  });
  mainFunction();
  saveToLocalStorage(); // Сохраняем данные в localStorage после изменения статуса задачи
}

add.addEventListener('click', (e) => {
  e.preventDefault();
  addNewTodo(newTodo);
});

inputNewTodo.addEventListener('input', (e) => {
  newTodo = e.target.value.trim();
});

// Функция для сохранения данных в localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(listOfNewTodos));
}

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = () => {
  const todosData = localStorage.getItem('todos');
  if (todosData) {
    listOfNewTodos = JSON.parse(todosData);
    mainFunction();
  }
}

// Вызываем функцию загрузки данных при загрузке страницы
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);