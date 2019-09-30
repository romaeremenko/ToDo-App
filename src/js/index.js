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
        for(let t of this.tasks){
            console.log(t);
        }
    }

    changeStatus(task, target, status){
        this.tasks[this.getIndex(task)].status = !status;

        let done = document.querySelector('[data-task-done = "'+ task + '"]');
        let innerText = document.querySelector('[data-task = "'+ task + '"]');
        let editButton = document.querySelector('[data-task-editTaskName = "'+ task + '"]');
        let descriptionButton = document.querySelector('[data-task-editTaskDescription = "'+ task + '"]');
        if (status == true) {
            done.style.display = "none";
            innerText.style.textDecoration = "none";
            innerText.style.color = 'black';
            editButton.style.display = 'block';
            descriptionButton.style.display = 'block';


        } else {
            done.style.display = "flex";
            innerText.style.textDecoration = "line-through";
            innerText.style.color = 'darkgrey';
            editButton.style.display = 'none';
            descriptionButton.style.display = 'none';
        }

        for(let t of this.tasks){
            console.log(t);
        }
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
    }

    _createTaskStatusField(node,toDo) {
        const input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('data-task-status', toDo.task);

        const done = document.createElement('span');
        done.setAttribute('data-task-done', toDo.task);
        done.innerText = "сделано";

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
        const descrition = document.createElement('button');
        descrition.setAttribute('data-task-editTaskDescription', toDo.task);

        node.appendChild(descrition);
    }
}

window.onload = function () {

    let toDoList = new Task();

    addToList.onclick = function () {
        toDoList.addTaskToList();
        input.value = null;
    };// ; не забывай и ниже

    list.onclick = function (event) {
        if(event.target.hasAttribute('data-task-status')){
            let task = event.target.getAttribute('data-task-status');
            // упростить if
            toDoList.changeStatus(task, event.target, !event.target.checked);
        }

        if(event.target.hasAttribute('data-task-clear')){
            let answer = confirm("Удалить?");
            if(!answer) return;
            let task = event.target.getAttribute('data-task-clear');
            event.target.parentElement.remove();
            toDoList.removeTask(task);
        }
    };
};