// array to store the tasks
var tasks = [];


// getting the element bu=y their Id's
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// function to add task 
function addTaskTODom(task){
    const li=document.createElement('li');
     li.innerHTML=
     `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
     <label for="${task.id}">${task.text}</label>
     <img src="download.png" class="delete" data-id="${task.id}" />`;

       taskList.append(li);
}


// function to render or to refresh task array/list
function renderList () {
       taskList.innerHTML='';
  for (let i = 0; i < tasks.length; i++) {
    addTaskTODom(tasks[i]);
 }
 tasksCounter.innerHTML=tasks.length;
     
}
// End



// function to mark the task as completed
function markTaskAsComplete (taskId) {
        const task =tasks.filter(function(task){
            return task.id===taskId;
        });

        if(task.length>0){
            const currentTask=task[0];
            currentTask.done=!currentTask.done;
            renderList();
            showNotification("Task is mark as completed");
             return;
        }
        showNotification("Task is not completed");
}
// End


// function to delete the task
function deleteTask (taskId) {
let newTasks=tasks.filter(function(task){
     return task.id!=taskId;
});
tasks=newTasks;
renderList();
showNotification('Task deleted successfully');
return;
}
// End




// function to add the task to the tasks array
function addTask (task) {
    
    tasks.push(task);
    renderList();
}
// End



function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text=e.target.value;

        if(!text){
           showNotification('Task can not be empty') 
           return;
        }
        const task={
               text,
               id: Date.now().toString(),
               done: false,
        }
        e.target.value='';
        addTask(task);
    }
}
function handleClickListener(e) {
    // let target=e.target;
    console.log(e.target);



    if (e.target.className==='delete') {
      tId =e.target.dataset.id;
        deleteTask(tId);
        return;
    } else if(e.target.className==='custom-checkbox') {
          tId=e.target.id;
        markTaskAsComplete(tId);
        return;
    }

    if (e.target.id==='clearAll') {
        tasks=[];
        renderList();
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
     document.addEventListener('click',handleClickListener);
}
initializeApp();

