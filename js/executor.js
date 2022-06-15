{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };
    const bindToggleDoneEvents = () => {

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };
    const bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };
    const focusNewTaskInput = () => {
        const newTaskContent = document.querySelector(".js-newTask");
        newTaskContent.focus();
        newTaskContent.value = "";
    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        focusNewTaskInput();

    };
    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {

            tasksListHTMLContent += `
            <li class="list__newTask">
                <button class="list__buttons list__buttons--done js-done">
                ${task.done ? "✔" : ""}
                </button>
                <span class="list__content ${task.done ? "list__content--done" : ""}">
                ${task.content}
                </span>
                <button class="list__buttons list__buttons--remove js-remove">
                🗑
                </button>
            </li>`
        };

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;

        bindRemoveEvents();
        bindToggleDoneEvents();


    };
    const init = () => {

        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}
