class Task {

    constructor(){
        this.tasks = new Set();
    }

    insertNode(task){
        const toDo = task; // valus !== task именование; используй const для значений без изменения
        let node = document.createElement('tr');

        this._createTaskStatusField(node,toDo); //аналогично для кнопки удаления
        this._createTaskTextFiels(node,toDo);
        this._createTaskDeleteButton(node,toDo);

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
            status: false
        };

        const task = JSON.stringify(toDo);
        // Приведи в нормальый вид if() {...} else {...}
        // JSON.stringify(toDo) вынеси
        if(this.checkTask(task)){
            return false;
        } else {
            this.tasks.add(task);
            this.insertNode(toDo);
        }
        for(let t of this.tasks){
            console.log(t);
        }
    }

    changeStatus(task, target, status){
        this.tasks.delete(`{"task":"${task}","status":${status}}`);
        this.tasks.add(`{"task":"${task}","status":${!status}}`);
        let done = document.querySelector('[data-task-done = "'+ task + '"]');
        let innerText = document.querySelector('[data-task = "'+ task + '"]');
        if (status == true) {
            done.style.display = "none";
            innerText.style.textDecoration = "none";
            innerText.style.color = 'black';
        } else {
            done.style.display = "flex";
            innerText.style.textDecoration = "line-through";
            innerText.style.color = 'darkgrey';
        }

        for(let t of this.tasks){
            console.log(t);
        }
    }

    checkTask(task){
        return this.tasks.has(task); // Упростить
    }

    removeTask(task){
        if(this.checkTask(task)){
            this.tasks.delete(task)
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
            let status = event.target.parentNode.firstChild.checked;
            let answer = confirm("Удалить?");
            if(!answer) return;
            let task = event.target.getAttribute('data-task-clear');
            event.target.parentElement.remove();
            toDoList.removeTask(`{"task":"${task}","status":${status}}`);
        }
    };
};