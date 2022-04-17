class Task{
    constructor(task, info){
        this.task = task;
        this.info = info;
    }
}

class UI{
    static displayTask(){
        const tasks = Store.getTask();
        tasks.forEach((task => UI.addTask(task)));
    }

    static addTask(task){
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.info}</td>
            <td><a href = '#' class = 'btn btn-danger btn-sm delete'>x</a></td>
        `;
        let tbody = document.getElementById('task-body');
        tbody.appendChild(row);
    }

    static deleteTask(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static alerts(message, classname){
        let div = document.createElement('div');
        let container = document.getElementById('container');
        let form = document.getElementById('form-list');
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form);
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }

    static clearField(){
        document.getElementById('task').value = '';
        document.getElementById('info').value = '';
    }
}

class Store{
    static getTask(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTaskToStore(task){
        const tasks = Store.getTask();
        tasks.push(task);
        localStorage.setItem('tasks' ,JSON.stringify(tasks));
    }

    static deleteTaskFromStore(info){
        const tasks = Store.getTask();
        tasks.forEach((task, index)=>{
            if(task.info === info){
                tasks.splice(index, 1)
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayTask)

document.getElementById('form-list').addEventListener('submit', (e)=>{
e.preventDefault();
    let task = document.getElementById('task').value;
    let info = document.getElementById('info').value;
    if(task === '' || info === ''){
        UI.alerts('Fill in all fields', 'danger');
    }else{
        const tasks = new Task(task, info);
        UI.addTask(tasks);
        UI.alerts('Task added','success');
        UI.clearField();
        Store.addTaskToStore(tasks);
    }
})

document.getElementById('task-body').addEventListener('click', (e)=>{
    UI.deleteTask(e.target);
    Store.deleteTaskFromStore(e.target.parentElement.previousElementSibling.textContent);
    UI.alerts('Task deleted', 'success');
})