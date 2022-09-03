let tasks = []
let Local = []
let addtobowork = () => {
    let inputtext = document.querySelector("#newTask").value;

    tasks.push(inputtext);
    document.querySelector("#newTask").value = "";
    render(tasks);
    setlocalstorage(tasks);
}
let render = () => {


    let content = "";

    tasks.map((task, index) => {

        content += `
            <li>
                <span class="">${task}</span>
                    <div class ="buttons">
                        <button class="clear" onclick="deleteTasks('${index}')" ><i class="fa-sharp fa-solid fa-trash"></i></button>
                        <button class="work" onclick="pushcheckComplete('${index}')"class="check"><i class="fa-sharp fa-solid fa-check"></i></button>
                    </div>
                
            </li>
            
  
        `
    })
    document.querySelector("#todo").innerHTML = content;
}
document.querySelector("#addItem").onclick = addtobowork;


let sortUp = () => {
    tasks.sort();
    Local.sort();
    render()
    checkwork()
}
document.getElementById("two").onclick = sortUp;

let sortdowm = () => {
    tasks.reverse()
    Local.reverse()
    render()
    checkwork()
}
document.getElementById("three").onclick = sortdowm;


let deleteTasks = (index) => {

    tasks.splice(index, 1);
    setlocalstorage(tasks);
    getlocalstorage();


}
let pushcheckComplete = (index) => {
    Local.push(tasks[index])
    deleteTasks(index)
    getlocalstorage();
}
let checkwork = () => {
  

    let content = "";
    Local.map((local, index) => {
        content += `
            <li>
                <span>${local}</span>
                <div class ="buttons">
                        <button class="clear" onclick="deletelocal('${index}')" ><i class="fa-sharp fa-solid fa-trash"></i></button>
                        <button class="work" onclick="" class="check"><i class="fa-sharp fa-solid fa-check-circle"></i></button>
                </div>
            </li>
        `
    })
    document.querySelector("#completed").innerHTML = content;
}

let deletelocal = (index) => {
    if (confirm('Bạn có muốn xõa không?')) {
        Local.splice(index, 1);
        setlocalstorage(Local);
        getlocalstorage();

    }

}

let setlocalstorage = () => {

    localStorage.setItem("Todo", JSON.stringify(tasks));
    localStorage.setItem("COMPLETE", JSON.stringify(Local));
}
let getlocalstorage = () => {
    if (localStorage.getItem("Todo") != undefined) {
        tasks = JSON.parse(localStorage.getItem("Todo"));
    }
    render(tasks);
    if (localStorage.getItem("COMPLETE") != undefined) {
        toComplete = JSON.parse(localStorage.getItem("COMPLETE"));
    }
    checkwork(Local);
}
getlocalstorage();