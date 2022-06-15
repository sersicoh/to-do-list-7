{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };
    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
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
    const renderTasks = () => {

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

    };
    const renderButtons = () => {

        const actionButtons = document.querySelector(".js-buttons");

        if (!tasks.length) {
            actionButtons.innerHTML = "";
            return;
        };

        actionButtons.innerHTML = `
        <button class="list__action--hideButton js-toggleHideDoneTasks"> ${"dupa"} </button>
        <button class="list__action--checkButton js-toggleTaskDone"> ${"dupa2"}</button>
        `;

    };
    const bindButtonsEvents = () => {


    };
    const render = () => {

        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();

    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        focusNewTaskInput();

        console.log(tasks);

    };
    const init = () => {

        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}
