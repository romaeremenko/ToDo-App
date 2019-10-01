class Task {

    constructor(){
        this.tasks = new Array();
    }

    insertNode(task){
        let node = document.createElement('tr');

        this._createTaskStatusField(node,task); //аналогично для кнопки удаления
        this._createTaskTextFiels(node,task);
        this._createTaskEditButton(node, task);
        this._createTaskEditDescription(node,task);
        this._createTaskDeleteButton(node,task);

        document.getElementById('list').appendChild(node);
    }

    addTaskToList(){
        let text = document.getElementById('input').value;

        if (!text.replace(/\s+/g, '')) {
            alert("Заполните поле!");
            return;
        }

        const toDo = {
            task: text,
            status: false,
            description: "",
        };

        if(this.checkTask(toDo.task)){
            return false;
        } else {
            this.tasks.push(toDo);
            this.insertNode(toDo);
        }

        this.setLocalStorage();

        for(let t of this.tasks){
            console.log(t);
        }
    }

    changeStatus(task, status){
        this.tasks[this.getIndex(task)].status = status;

        let done = document.querySelector('[data-task-done = "'+ task + '"]');
        let innerText = document.querySelector('[data-task = "'+ task + '"]');
        let editButton = document.querySelector('[data-task-editTaskName = "'+ task + '"]');
        let descriptionButton = document.querySelector('[data-task-editTaskDescription = "'+ task + '"]');
        if (status != true) {
            done.style.display = "none";
            innerText.style.textDecoration = "none";
            innerText.style.color = 'black';
            editButton.style.display = 'block';
            descriptionButton.style.display = 'block';
            innerText.classList.remove("taskDone");
        } else {
            done.style.display = "flex";
            innerText.classList.add("taskDone");
            innerText.style.textDecoration = "line-through";
            innerText.style.color = 'darkgrey';
            editButton.style.display = 'none';
            descriptionButton.style.display = 'none';
            let description = document.querySelector('[data-task-editViewDescription = "'+ task + '"]');
            if(description != null){
                description.remove();
            }
        }

        this.setLocalStorage();

        for(let t of this.tasks){
            console.log(t);
        }
    }

    changeTaskName(value, previousTaskName){
        let taskField = document.querySelector('[data-task = "'+ previousTaskName + '"]');
        let clearField = document.querySelector('[data-task-clear = "'+ previousTaskName + '"]');
        let statusField = document.querySelector('[data-task-status = "'+ previousTaskName + '"]');
        let doneField = document.querySelector('[data-task-done = "'+ previousTaskName + '"]');
        let editButton = document.querySelector('[data-task-editTaskName = "'+ previousTaskName + '"]');
        let descrButton = document.querySelector('[data-task-editTaskDescription = "'+ previousTaskName + '"]');
        let descrView = document.querySelector('[data-task-editViewDescription = "'+ previousTaskName + '"]');

        taskField.setAttribute("data-task", value);
        clearField.setAttribute("data-task-clear", value);
        statusField.setAttribute("data-task-status", value);
        doneField.setAttribute("data-task-done", value);
        editButton.setAttribute("data-task-editTaskName", value);
        descrButton.setAttribute("data-task-editTaskDescription", value);
        if(descrView != null) {
            descrView.setAttribute("data-task-editViewDescription", value);
        }

        let index = this.getIndex(previousTaskName);

        taskField.innerText = value;
        this.tasks[index].task = value;

        this.setLocalStorage();
    }

    checkTask(task){
        console.log(this.tasks.map( obj => obj.task).includes(task));
        return this.tasks.map( obj => obj.task).includes(task);
    }

    getIndex(element){
        return this.tasks.map( obj => obj.task).indexOf(element);
    }

    removeTask(task){
        if(this.checkTask(task)){
            this.tasks.splice(this.getIndex(task),1);
        }

        for(let t of this.tasks){
            console.log(t);
        }

        let description = document.querySelector('[data-task-editViewDescription = "'+ task + '"]');
        if(description != null){
            description.remove();
        }

        this.setLocalStorage();
    }

    _createTaskStatusField(node,toDo) {
        const input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('data-task-status', toDo.task);

        const done = document.createElement('span');
        done.setAttribute('data-task-done', toDo.task);
        done.innerText = "✔";

        node.appendChild(input);
        node.appendChild(done);
    }

    _createTaskDeleteButton(node, toDo){
        const clear = document.createElement('button');
        clear.setAttribute('data-task-clear', toDo.task);

        node.appendChild(clear);
    }

    _createTaskTextFiels(node, toDo){
        let text = document.createElement('td');
        text.setAttribute('data-task', toDo.task);

        text.innerText = toDo.task;
        node.appendChild(text);
    }

    _createTaskEditButton(node, toDo){
        const edit = document.createElement('button');
        edit.setAttribute('data-task-editTaskName', toDo.task);

        node.appendChild(edit);
    }

    _createTaskEditDescription(node, toDo){
        const description = document.createElement('button');
        description.setAttribute('data-task-editTaskDescription', toDo.task);

        node.appendChild(description);
    }

    createDescriptionNode(task){
        let elem = document.querySelector('[data-task-editTaskDescription = "'+ task + '"]');

        let description = document.querySelector('[data-task-editViewDescription = "'+ task + '"]');

        const index = this.getIndex(task);

        const div = document.createElement('div');

        if(description === null){
            div.className ="view";
            div.setAttribute('data-task-editViewDescription',task);
            div.innerHTML = this.tasks[index].description;
            elem.parentElement.after(div);
        } else {
            description.remove();
        }
    }

    editDescriptionNode(task){
        let elem = document.querySelector('[data-task-editViewDescription = "'+ task + '"]');

        let index = this.getIndex(task);

        let area = document.createElement('textarea');
        area.className = 'editDescription';
        area.value = elem.innerHTML;

        area.onkeydown = function(event) {
            if (event.key == 'Enter') {
                this.blur();
            }
        };

        area.onblur = function() {
            elem.innerHTML = area.value;
            area.replaceWith(elem);
            this.tasks[index].description = elem.innerHTML;
            this.setLocalStorage();
        }.bind(this);

        elem.replaceWith(area);
        area.focus();
    }

    clearList(){
        this.tasks = new Array();
        this.setLocalStorage();
        list.innerHTML = '';
    }

    setLocalStorage(){
        localStorage.setItem('list_of_tasks', JSON.stringify(this.tasks));
    }
}

window.onload = function () {

    let toDoList = new Task();

    let listOfTasks = JSON.parse(localStorage.getItem('list_of_tasks'));

    console.log(listOfTasks);

    if(listOfTasks.length != 0){
        for (let elem of listOfTasks){
            recoverTasks(elem);
        }
    }

    function recoverTasks(elem){
        toDoList.tasks.push(elem);
        toDoList.insertNode(elem);
        toDoList.changeStatus(elem.task, elem.status);
        if(elem.status == true){
            document.querySelector('[data-task-status = "'+ elem.task + '"]').checked = true;
        }
    }

    addToList.onclick = function () {
        toDoList.addTaskToList();
        input.value = null;
    };// ; не забывай и ниже

    list.onclick = function (event) {
        if(event.target.hasAttribute('data-task-status')){
            let task = event.target.getAttribute('data-task-status');
            // упростить if
            toDoList.changeStatus(task, event.target.checked);
        }

        if(event.target.hasAttribute('data-task-clear')){
            let answer = confirm("Удалить?");
            if(!answer) return;
            let task = event.target.getAttribute('data-task-clear');
            event.target.parentElement.remove();
            toDoList.removeTask(task);
        }

        if(event.target.hasAttribute('data-task-editTaskName')){
            let task = event.target.getAttribute('data-task-editTaskName');
            showPrompt("Введите новое название задачи", task);
        }

        if(event.target.hasAttribute('data-task-editTaskDescription')){
            let task = event.target.getAttribute('data-task-editTaskDescription');
            toDoList.createDescriptionNode(task);
        }

        if(event.target.hasAttribute('data-task-editViewDescription')){
            let task = event.target.getAttribute('data-task-editViewDescription');
            toDoList.editDescriptionNode(task);
        }
    };

    deleteAll.onclick = function(){
        toDoList.clearList();
    }

    document.getElementsByClassName("show-button").onclick = function (event) {
        if(event.target.hasAttribute('data-task-status')){
            let task = event.target.getAttribute('data-task-status');
            // упростить if
            toDoList.changeStatus(task, !event.target.checked);
        }

        if(event.target.hasAttribute('data-task-clear')){
            let answer = confirm("Удалить?");
            if(!answer) return;
            let task = event.target.getAttribute('data-task-clear');
            event.target.parentElement.remove();
            toDoList.removeTask(task);
        }
    };

    function showCover() {
        let coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.append(coverDiv);
    }

    function hideCover() {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
    }

    function showPrompt(text, task) {
        showCover();
        let form = document.getElementById('prompt-form');
        let container = document.getElementById('prompt-form-container');
        document.getElementById('prompt-message').innerHTML = text;
        form.text.value = '';

        function complete(value) {
            hideCover();

            if(value != null){
                toDoList.changeTaskName(value,task);
            }
            container.style.display = 'none';
            document.onkeydown = null;
        }

        form.onsubmit = function() {
            let value = form.text.value;
            if (value.replace(/\s+/g, '') == ''){
                alert("Поле пустое!");
                return false;
            }

            complete(value);
            return false;
        };

        form.cancel.onclick = function() {
            complete(null);
        };

        container.style.display = 'block';
        form.elements.text.focus();
    }

};