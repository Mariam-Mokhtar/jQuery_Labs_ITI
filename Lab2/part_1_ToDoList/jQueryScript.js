var form = $(".needs-validation");
var ul_element = $("#listOfTasks");
var add_btn = $("#submit");
var remove_btns;
var arrayOfTasks = [];

// Check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// get tasks from local storage 
getTasksFromLocalStorage();
// add button
add_btn.on("click", function (event) {
    var task_name = $("#validationCustomUsername");
    var task = {
        id: Date.now(),
        name: task_name.val(),
        completed: false,
    }
    addTask(task);
    arrayOfTasks.push(task);
    addTasksToLocalStorageFrom(arrayOfTasks);
    task_name.val('');
    event.preventDefault();
})

// task html
function addTask(task) {
    ul_element.css("overflowY", "scroll");
    var li_element = `<li class="container my-2  mx-0 list-group-item shadow-lg rounded-4 bg-light" id=${task.id}>
    <div class="row ">
    <p class="col-md-10 my-auto ps-3 mb-1 mb-md-0">${task.name}</p>
    <i id="done" role="button" class="col-6 col-md-1 bi bi-check2-circle text-center my-auto icon-font"></i>
    <i id="remove" role="button" class="col-6 col-md-1 bi bi-trash text-center my-auto icon-font"></i>
    </div>
    </li>`;
    ul_element.append(li_element);
    // return saved status
    if (task.completed) {
        li_element = ul_element.find(`#${task.id}`)
        li_element.removeClass('bg-light');
        li_element.addClass('text-decoration-line-through');
        li_element.css({ 'background-color': '#bcf2bf' });
    }
}

ul_element.on("click", "#remove", function (e) {
    var parent_li = $(this).closest('li');
    // Remove task from page
    parent_li.remove();
    // Remove task from local Storage
    deleteTaskFromLocalStorage(parent_li.attr("id"));
})
ul_element.on("click", "#done", function (e) {
    var parent_li = $(this).closest('li');
    toggleStatuesTask(parent_li.attr("id"));
    parent_li.toggleClass('bg-light');
    parent_li.toggleClass('text-decoration-line-through');
    parent_li.css({ 'background-color': '#bcf2bf' });
})

/*****************Check Local Storge Syntax********************** */
function addTasksToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage() {
    var data = localStorage.getItem("tasks");
    if (data) {
        var tasks = JSON.parse(data);
        for (let i = 0; i < tasks.length; i++) {
            addTask(tasks[i]);
        }
    }
}
function deleteTaskFromLocalStorage(taskId) {
    // Update array of tasks after filtering the task we want to remove
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalStorageFrom(arrayOfTasks);
}
function toggleStatuesTask(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ?
                (arrayOfTasks[i].completed = true) :
                (arrayOfTasks[i].completed = false);
        }
    }
    addTasksToLocalStorageFrom(arrayOfTasks);
}
