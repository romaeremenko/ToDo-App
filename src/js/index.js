class Task {

    constructor(){
        this.tasks = new Set();
    }

    insertNode(task){
        let values = task;
        let node = document.createElement('tr');
        let status = document.createElement('input');
        let clear = document.createElement('button');
        let text = document.createElement('td');

        status.setAttribute('type','checkbox');
        status.setAttribute('data-task-status', values.task);
        clear.setAttribute('data-task-clear', values.task);
        text.innerText = values.task;

        node.appendChild(status);
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
        return this.tasks.has(task) ? true : false;
    }

    removeTask(task){
        if(this.checkTask(task)){
            this.tasks.delete(task)
        }
    }

}

window.onload = function () {

    let toDoList = new Task();

    addToList.onclick = function () {
        toDoList.addTaskToList();
        input.value = null;
    }

    list.onclick = function (event) {
        if(event.target.hasAttribute('data-task-status')){
            let task = event.target.getAttribute('data-task-status');
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