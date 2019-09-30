class Task {

    constructor(){
        this.tasks = new Set();
    }

    insertNode(task){
        let values = task; // valus !== task именование; используй const для значений без изменения
        let node = document.createElement('tr');
        let clear = document.createElement('button');
        let text = document.createElement('td');


        clear.setAttribute('data-task-clear', values.task);
        text.innerText = values.task;

        this._createTaskStatusField(node); //аналогично для кнопки удаления
        node.appendChild(text);
        node.appendChild(clear);
        document.getElementById('list').appendChild(node);
    }

    addTaskToList(){
        let text = document.getElementById('input').value;

        if (!text.replace(/\s+/g, '')) {
            alert("Заполните поле!");
            return;
        }

        let toDo = {
            task: text,
            status: false
        };

        // Приведи в нормальый вид if() {...} else {...}
        // JSON.stringify(toDo) вынеси
        if(this.checkTask(JSON.stringify(toDo))) return;

        else {
            this.tasks.add(JSON.stringify(toDo));
            this.insertNode(toDo);
        }
    }

    changeStatus(task, target, status){
        this.tasks.delete(`{"task":"${task}","status":${status}}`);
        this.tasks.add(`{"task":"${task}","status":${!status}}`);
    }

    checkTask(task){
        return this.tasks.has(task) ? true : false; // Упростить
    }

    removeTask(task){
        if(this.checkTask(task)){
            this.tasks.delete(task)
        }
    }

    _createTaskStatusField(node) {
        const input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('data-task-status', false);

        node.appendChild(input);
    }

}

window.onload = function () {

    let toDoList = new Task();

    addToList.onclick = function () {
        toDoList.addTaskToList();
        input.value = null;
    }// ; не забывай и ниже

    list.onclick = function (event) {
        if(event.target.hasAttribute('data-task-status')){
            let task = event.target.getAttribute('data-task-status');
            // упростить if
            if(event.target.checked) {
                toDoList.changeStatus(task, event.target, false);
            } else {
                toDoList.changeStatus(task, event.target, true);
            }
        }

        if(event.target.hasAttribute('data-task-clear')){
            let status = event.target.parentNode.firstChild.checked;
            let answer = confirm("Delete?");
            if(!answer) return;
            let task = event.target.getAttribute('data-task-clear');
            event.target.parentElement.remove();
            toDoList.removeTask(`{"task":"${task}","status":${status}}`);
        }
    }
}