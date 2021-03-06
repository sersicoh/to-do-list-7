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
    const toggleAllTaskDone = () => {
        tasks = tasks.map(
            (task) => ({
                ...task,
                done: true,
            })
        );
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
        <li class="list__newTask ${task.done && hideDoneTasks ? "list__newTask--hidden" : ""}">
            <button class="list__buttons list__buttons--done js-done">
            ${task.done ? "???" : ""}
            </button>
            <span class="list__content ${task.done ? "list__content--done" : ""}">
            ${task.content}
            </span>
            <button class="list__buttons list__buttons--remove js-remove">
            ????
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
        <button class="list__actionButton js-toggleHideDoneTasks"> ${hideDoneTasks ? "Poka??" : "Ukryj"} uko??czone </button>
        <button class="list__actionButton list__actionButton--disabled js-toggleAllTaskDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}> Uko??cz wszystkie</button>
        `;

    };
    const bindButtonsEvents = () => {

        const hideDoneTask = document.querySelector(".js-toggleHideDoneTasks");
        if (hideDoneTask) {
            hideDoneTask.addEventListener("click", toggleHideDoneTasks);
        };

        const completeAllDoneTask = document.querySelector(".js-toggleAllTaskDone");
        if (completeAllDoneTask) {
            completeAllDoneTask.addEventListener("click", toggleAllTaskDone);
        };

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
