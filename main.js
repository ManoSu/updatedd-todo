const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const deadlineInput = document.getElementById("task-deadline");

function saveData() {
	const tasks = Array.from(taskList.querySelectorAll(".task")).map(task => {
		const taskText = task.querySelector("input[type='text']").value;
		const deadline = task.querySelector("input[type='date']").value;
		const completed = task.querySelector("input[type='checkbox']").checked;

		return { taskText, deadline, completed };
	});

	localStorage.setItem("taskData", JSON.stringify(tasks));
}

function addTask() {
	const taskText = newTaskInput.value;
	const deadline = deadlineInput.value;
	if (taskText.trim() === "") return;
	alert 

	const li = document.createElement("li");
	li.classList.add("task");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.addEventListener("change", toggleTask);

	const taskTextElement = document.createElement("input");
	taskTextElement.type = "text";
	taskTextElement.value = taskText;
	taskTextElement.addEventListener("input", editTask);

	const deadlineElement = document.createElement("input");
	deadlineElement.type = "date";
	deadlineElement.value = deadline;
	deadlineElement.addEventListener("change", setDeadline);

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-button";
	deleteButton.textContent = "Delete";
	deleteButton.addEventListener("click", deleteTask);

	li.appendChild(checkbox);
	li.appendChild(taskTextElement);
	li.appendChild(deadlineElement);
	li.appendChild(deleteButton);

	taskList.appendChild(li);

	newTaskInput.value = "";
	deadlineInput.value = "";

	// Save the task data to local storage
	saveData();
}

function toggleTask() {
	const taskTextElement = this.parentElement.querySelector("input[type='text']");
	taskTextElement.classList.toggle("completed");
}

function editTask() {
	const taskTextElement = this;
	if (taskTextElement.classList.contains("completed")) {
		taskTextElement.classList.remove("completed");
	}
}

function setDeadline() {
	// You can handle deadline changes here if needed.
}

function deleteTask() {
	const taskItem = this.parentElement;
	taskList.removeChild(taskItem);

	// Save the updated task data to local storage after deletion
	saveData();
}

function initialize() {
	const savedData = localStorage.getItem("taskData");

	if (savedData) {
		const tasks = JSON.parse(savedData);

		tasks.forEach(taskData => {
			const li = document.createElement("li");
			li.classList.add("task");

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = taskData.completed;
			checkbox.addEventListener("change", toggleTask);

			const taskTextElement = document.createElement("input");
			taskTextElement.type = "text";
			taskTextElement.value = taskData.taskText;
			taskTextElement.addEventListener("input", editTask);

			const deadlineElement = document.createElement("input");
			deadlineElement.type = "date";
			deadlineElement.value = taskData.deadline;
			deadlineElement.addEventListener("change", setDeadline);

			const deleteButton = document.createElement("button");
			deleteButton.className = "delete-button";
			deleteButton.textContent = "Delete";
			deleteButton.addEventListener("click", deleteTask);

			li.appendChild(checkbox);
			li.appendChild(taskTextElement);
			li.appendChild(deadlineElement);
			li.appendChild(deleteButton);

			taskList.appendChild(li);
		});
	}
}

// Call the initialize function when the page loads
window.addEventListener("load", initialize);
