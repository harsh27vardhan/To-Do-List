const input = document.getElementById("todo-input");
const button = document.getElementById("todo-button");
const list = document.getElementById("todo-list");
const form = document.getElementById("input-form");
let tasks = [];
let previousTasks = [];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("Input :",input.value);
    if(input.value !== ""){
        addTask(input.value); 
    }
    input.value = "";
})

function addTask(label,ifChecked="unchecked"){
    const item = document.createElement("li");
    item.classList.add("todo-task");

    const span = document.createElement("span");
    span.classList.add("todo-task-label");
    span.innerText= label;

    const checkTask = document.createElement("img");
    checkTask.classList.add("todo-task-status");
    // checkTask.src = "assets/checkbox-checked-svgrepo-com.svg";
    // checkTask.alt = "checked";
    if(ifChecked==="checked"){
        checkTask.src = "assets/checkbox-checked-svgrepo-com.svg";
    }
    else{
        checkTask.src = "assets/checkbox-unchecked-svgrepo-com.svg";
        checkTask.classList.add("unchecked");
    }
    checkTask.addEventListener("click",()=>{
        checkTask.classList.toggle("unchecked");
        checkTask.src = checkTask.className.includes("unchecked")
        ? "assets/checkbox-unchecked-svgrepo-com.svg"
        : "assets/checkbox-checked-svgrepo-com.svg";

        updateTasks(span,checkTask);
        // localStorage.setItem("todos",JSON.stringify(tasks));
        console.log(checkTask.className.includes("unchecked"), label);
    });

    const deleteTask = document.createElement("img");
    deleteTask.classList.add("todo-task-delete");
    deleteTask.src = "assets/trash-svgrepo-com.svg";
    deleteTask.alt = "trash";
    deleteTask.addEventListener("click",()=>{
        
        item.remove();
        tasks.forEach((element,index)=>{
            if(element.task === span.innerText){
                tasks.splice(index,1);
            }
        })
        localStorage.setItem("todos",JSON.stringify(tasks));
    });

    item.append(span,checkTask,deleteTask);
    list.append(item);

    let obj = {"status": checkTask.className.includes("unchecked") ? "unchecked" : "checked",
         "task":label};
    tasks.push(obj);
    localStorage.setItem("todos",JSON.stringify(tasks));
}

function checklocalStorage(){
    previousTasks = JSON.parse(localStorage.getItem("todos"));
    console.log(previousTasks);
    if(previousTasks===null){
        previousTasks = [];
    }
    previousTasks.forEach(element => {
        addTask(element.task,element.status);
    });
}

function updateTasks(span,checkTask){
    flag = checkTask.className.includes("unchecked") ? "unchecked" : "checked"
    console.log(flag,span);
    tasks.forEach((element)=>{
        if(element.task === span.innerText){
            element.status = flag;
        }
    });
    console.log(localStorage.getItem("todos"));
    localStorage.setItem("todos",JSON.stringify(tasks));
}

checklocalStorage();