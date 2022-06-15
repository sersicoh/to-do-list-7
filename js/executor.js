{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };
    const doneButtonToggle = (index) => {
        tasks[index].done = !tasks[index].done
        render();
    };
    const checkDoneTask = () => {

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneButtonToggle(index);
                render();
            })
        });
    };
    const removeTask = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
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
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        focusNewTaskInput();

    };
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
            <li class="list__newTask">
                <button class="list__buttons list__buttons--done js-done">${task.done ? "✔" : ""}</button>
                <span class="list__content ${task.done ? "list__content--done" : ""}">${task.content}</span>
                <button class="list__buttons list__buttons--remove js-remove">🗑</button>
            </li>`
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        removeTask();
        checkDoneTask();
    };
    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}
