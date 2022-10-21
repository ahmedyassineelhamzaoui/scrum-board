const title=document.querySelector("#title");
const radio1=document.querySelector("#radio1");
const radio2=document.querySelector("#radio2");
const select1=document.querySelector("#select1");
const select2=document.querySelector("#select2");
const date=document.querySelector("#date");
const description=document.querySelector("#description");

const form=document.querySelector("#form");
const todo=document.querySelector("#todo");
const inprogress=document.querySelector("#inprogress");
const done=document.querySelector("#done");

let todocount=document.querySelector("#todocount");
let donecount=document.querySelector("#donecount");
let inprogresscount=document.querySelector("#inprogresscount");

let save=document.querySelector("#save");
let update=document.querySelector("#update");


function initTaskForm() {
    todo.innerHTML="";
    inprogress.innerHTML="";
    done.innerHTML="";
    let t=0;
    let i=0;
    let d=0;
    for(let task of tasks){
    if(task.description.length>50){
        var short=task.description.substring(0,50)+'...';
    }
       if(task.status=="To Do"){
        t++;
        todo.innerHTML +=`<button class="w-100 py-2 d-flex border-0 border-top">
        <div class="mx-1 fs-3 ">
            <i class="bi bi-question-circle "></i>
        </div>
        <div class="card-text text-start">
            <div class="fw-bolder fs-7 mx-3">${task.title}</div>
            <div class="mx-3">
                <div class="fw-light">#${task.id} created in ${task.date}</div>
                <div class="fst-normal" title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly.">${short}</div>
            </div>
            <div class="mx-3 mb-1 mt-1">
                <span class="btn-primary px-2 py-1 rounded-2">${task.priority}</span>
                <span class="btn-light  px-2 py-1 rounded-2" >${task.type}</span>
            </div>
        </div>
        <div class="mx-1 fs-3 ">
        <i onclick="deleteTask(${task.id});" class="text-red fa-solid fa-square-minus"></i>
        <i onclick="editTask(${task.id});" class="fa-regular fa-pen-to-square"></i>
        </div>
    </button>`
       }else if(task.status=="In Progress"){
        i++;
        inprogress.innerHTML +=`<button class="w-100 py-2 d-flex border-0 border-top" >
        <div class="mx-1 my-1">
            <div class="spinner-border " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
        </div>
        <div class="card-text text-start">
            <div class="mx-3 fw-bolder fs-7">${task.title}</div>
            <div class="mx-3">
                <div class="fw-light">#${task.id} created in ${task.date}</div>
                <div class="" title="including as many details as possible.">${short}</div>
            </div>
            <div class="mx-3 mb-1 mt-1">
                <span class="btn-primary px-2 py-1 rounded-2">${task.priority}</span>
                <span class="btn-light px-2 py-1 rounded-2">${task.type}</span>
            </div>
        </div>
        <div class="mx-1 fs-3 ">
             <i onclick="deleteTask(${task.id});" class="text-red fa-solid fa-square-minus"></i>
             <i onclick="editTask(${task.id});" class="fa-regular fa-pen-to-square"></i>
         </div>
    </button>`
       }else{
        d++;
        done.innerHTML +=`<button onclick="editTask(${task.id});" class="w-100 py-2  d-flex  border-0 border-top" >
        <div class="mx-1 fs-3">
            <i class=" bi bi-check-circle "></i> 
        </div>
        <div class="card-text text-start">
            <div class="mx-3 fw-bolder fs-7">${task.title}</div>
            <div class="mx-3">
                <div class="fw-light">#${task.id} created in ${task.date}</div>
                <div class="" title="as they can be helpful in reproducing the steps that caused the problem in the first place.">${short}</div>
            </div>
            <div class="mx-3 mb-1 mt-1">
                <span class="btn-primary px-2 py-1 rounded-2">${task.priority}</span>
                <span class="btn-light px-2 py-1 rounded-2">${task.type}</span>
            </div>
        </div>
        <div class="mx-1 fs-3 ">
            <i onclick="deleteTask(${task.id});" class="text-red fa-solid fa-square-minus"></i>
            <i onclick="editTask(${task.id});" class="fa-regular fa-pen-to-square"></i>
         </div>
    </button>`
       }
    }
    todocount.innerHTML=t;
    inprogresscount.innerHTML=i;
    donecount.innerHTML=d;
}
initTaskForm();

 function createTask() {
    reloadTasks();
    $("#modal-task").modal("show");
}

function saveTask() {
    task={};
    if(count>1){
        task.id=tasks.length+1;
    }else{
        task.id=count;
    }
    task = {
        'id'            :   tasks.length+1,
        'title'         :   title.value,
        'type'          :   '',
        'priority'      :   select1.value,
        'status'        :   select2.value,
        'date'          :   date.value,
        'description'   :   description.value,
    }
    if(radio1.checked==true){
        task.type="Feature";
    }else{
        task.type="Bug";
    }
  
    tasks.push(task);
    initTaskForm();
    reloadTasks();
}
function deleteTask(index) {
    tasks=tasks.filter(function(task){
        return task.id!=index;
    });
    initTaskForm();
}
function editTask(index) {
  save.style.display="none";
  update.style.display="block";
  title.value=tasks[index-1].title;
  description.value=tasks[index-1].description;
  select1.value=tasks[index-1].priority;
  select2.value=tasks[index-1].status;
  date.value=tasks[index-1].date;
  if(tasks[index-1].type=="Feature"){
    radio1.checked=true;
  }else if(tasks[index-1].type=="Bug"){
    radio2.checked=true;
  }
  $("#modal-task").modal("show");
  update.addEventListener("click", ()=>{
    let task = {
        'id'            :   index,
        'title'         :   title.value,
        'type'          :   '',
        'priority'      :   select1.value,
        'status'        :   select2.value,
        'date'          :   date.value,
        'description'   :   description.value,
    }
    if(radio1.checked==true){
        task.type="Feature";
    }else{
        task.type="Bug";
    }
    tasks[index - 1] = task

    initTaskForm()
  });
}


function reloadTasks() {
    form.reset();
}