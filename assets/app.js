//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

// Main elements
const CLASS_NAME_INPUT = 'form-input';
const CLASS_NAME_BUTTON = 'btn';

const CLASS_NAME_TODO_ITEM = 'todo-item';
const CLASS_NAME_TODO_TEXT = 'todo-item__text';
const CLASS_NAME_TODO_INPUT = 'todo-item__input';
const CLASS_NAME_EDIT_MODE = 'todo-item_edit';
const CLASS_NAME_BUTTON_EDIT = 'btn_edit';
const CLASS_NAME_BUTTON_DELETE = 'btn_delete';

const incompleteTaskHolder = document.querySelector("#todo-list-incomplete");

// create new task
(() => {
    const form = document.querySelector("#todo-form-new");
    const input = form.querySelector("input[type=text]");

    async function sendRequest() {
      console.log("New task: sending request");
    }

    async function addTask() {
        if (!input.value) return;

        await sendRequest(input.value);

        const newElm = createNewTaskElement(input.value);

        incompleteTaskHolder.appendChild(newElm);
        bindTaskEvents(newElm, taskCompleted);

        input.value = "";
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask();
    });
})();


var addButton=document.getElementsByTagName("button")[0];//first button
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


function createNewTaskElement(taskString){
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const text = document.createElement("p");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton=document.createElement("button");

    listItem.className = CLASS_NAME_TODO_ITEM;

    checkBox.type = "checkbox";
    text.innerText = taskString;
    text.className = CLASS_NAME_TODO_TEXT;

    editInput.type = "text";
    editInput.classList.add(CLASS_NAME_INPUT);
    editInput.classList.add(CLASS_NAME_TODO_INPUT);

    editButton.innerText="Edit";
    editButton.classList.add(CLASS_NAME_BUTTON);
    editButton.classList.add(CLASS_NAME_BUTTON_EDIT);
    deleteButton.classList.add(CLASS_NAME_BUTTON);
    deleteButton.classList.add(CLASS_NAME_BUTTON_DELETE);

    listItem.appendChild(checkBox);
    listItem.appendChild(text);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


//Edit an existing task.

function editTask() {
    const parent = this.parentNode;

    const editInput = parent.querySelector('input[type=text]');
    const text = parent.querySelector(`.${CLASS_NAME_TODO_TEXT}`);
    const editBtn = parent.querySelector(`.${CLASS_NAME_BUTTON_EDIT}`);
    const containsClass = parent.classList.contains(CLASS_NAME_EDIT_MODE);

    if (containsClass) {
        text.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = text.innerText;
        editBtn.innerText = "Save";
    }

    parent.classList.toggle(CLASS_NAME_EDIT_MODE);
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


function taskIncomplete(){
    const listItem = this.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem,checkBoxEventHandler){
    //select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(`.${CLASS_NAME_BUTTON_EDIT}`);
    var deleteButton=taskListItem.querySelector(`.${CLASS_NAME_BUTTON_DELETE}`);

    if (editButton) {
        editButton.onclick = editTask;
    }

    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

[...incompleteTaskHolder.querySelectorAll(`.${CLASS_NAME_TODO_ITEM}`)].forEach(
    (elm) => {
        bindTaskEvents(elm, taskCompleted);
    }
);

[...completedTasksHolder.querySelectorAll(`.${CLASS_NAME_TODO_ITEM}`)].forEach(
    (elm) => {
        bindTaskEvents(elm, taskIncomplete);
    }
);
