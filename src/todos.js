const todosForm = document.querySelector(".todos");
const todosInput = document.querySelector(".todo-input");
let todos = [];

const TODOS_LS = "todos";
const STATUS_PENDING = "PENDING";
const STATUS_FINISH = "FINISH";

function saveTodos(todos) {
	localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function loadTodos() {
	const loadTodos = localStorage.getItem(TODOS_LS);
	if (!loadTodos) return;
	const parsedTodos = JSON.parse(loadTodos);
	parsedTodos.forEach(function (todo) {
		paintTodo(todo.text, todo.status);
	});
}

function handleSubmit(event) {
	event.preventDefault();
	console.log("submit");
	paintTodo(todosInput.value);
	todosInput.value = "";
}

function paintTodo(text, status = STATUS_PENDING) {
	const ul = document.querySelector(".todos-pending");
	const li = document.createElement("li");
	const span = document.createElement("span");
	const deleteBtn = document.createElement("button");
	const changeStatusBtn = document.createElement("button");

	deleteBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
	deleteBtn.style.color = "red";
	deleteBtn.addEventListener("click", deleteTodo);

	changeStatusBtn.addEventListener("click", toggleTodo);

	const newId = Date.now();
	li.id = newId;
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(deleteBtn);
	li.appendChild(changeStatusBtn);
	//set pending tasks
	if (status === STATUS_PENDING) {
		const ul = document.querySelector(".todos-pending");
		ul.appendChild(li);
		changeStatusBtn.innerHTML = "<i class='fas fa-check'></i>";
		changeStatusBtn.style.color = "#2ecc71";
	}
	//set finish tasks
	else {
		const ul = document.querySelector(".todos-finish");
		ul.appendChild(li);
		changeStatusBtn.innerHTML = "<i class='fas fa-redo'></i>";
		changeStatusBtn.style.color = "#3498db";
	}

	const todoObj = {
		id: newId,
		text: text,
		status: status,
	};
	todos.push(todoObj);
	saveTodos(todos);
}

function deleteTodo(event) {
	const li = event.target.parentNode.parentNode;
	const currentId = li.id;
	li.remove();
	todos = todos.filter(function (todo) {
		return todo.id !== parseInt(currentId);
	});
	saveTodos(todos);
}

function toggleTodo(event) {
	const li = event.target.parentNode.parentNode;
	const currentId = li.id;

	//find task using id. it returns only one length of array.
	const findTodo = todos.find(function (todo) {
		return todo.id === parseInt(currentId);
	});
	const text = findTodo.text;
	//toggle status between PENDING and FINISH
	const toggledStatus = findTodo.status === STATUS_PENDING ? STATUS_FINISH : STATUS_PENDING;

	//delete tasks already exists in advance
	deleteTodo(event);
	paintTodo(text, toggledStatus);
}

function init() {
	todosForm.addEventListener("submit", handleSubmit);
	loadTodos();
}

init();
