var tasks = [];
var seqVals = [];
var count = 0;
var doneTasks = []; //done = false; pending = true; --> had to change because default is true
var doneidx = [];
var debugStatus = document.getElementById("stats");

function DandT() {
    var agr = new Date(),
    months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
    if(agr.getMinutes()<10){
        time = agr.getHours() + ':0' + agr.getMinutes();
    }
    else{
        time = agr.getHours() + ':' + agr.getMinutes();
    }

    date = [agr.getDate(), months[agr.getMonth()], agr.getFullYear()].join(' ');

    document.getElementById('dAndT').innerHTML = [date, time].join(' / ');
    setTimeout(DandT, 1000);
}

function add(){
    var task = document.getElementById("activity");
    var imp = document.getElementById("importance");
    var time = document.getElementById("time");

    tasks[tasks.length] = task.value;
    seqVals[seqVals.length] = imp.value/time.value;
    doneidx[doneidx.length] = true;
    sortArrays();
    updateTasks();
    save_tasks(tasks);
}

function updateTasks(){
    var display = document.getElementById("listTasks");
    var text = "<ol type=\"1\">";
    var i = 0;
    for (i = 0; i < tasks.length; i++) {
        text += "<li>" + tasks[i] + "</li>";
    }
    text += "</ol>";
    display.innerHTML = text;
}

function updateDone(){
    var text = "<ol type=\"1\">";
    var i=0;
    for (i = 0; i < doneTasks.length; i++) {
        text += "<li>" + doneTasks[i] + "</li>";
    }
    text +="</ol>";
    document.getElementById("doneTasks").innerHTML = text;
    updateTasks();
}

function sortArrays(){
    var j = 0;
    for(j = seqVals.length - 1; j > 0; j--){
        if(seqVals[j] > seqVals[j-1]) {
            var temp = seqVals[j];
            seqVals[j] = seqVals[j-1];
            seqVals[j-1] = temp;
            temp = tasks[j];
            tasks[j] = tasks[j-1];
            tasks[j-1] = temp;
            if(doneidx[j]!=doneidx[j-1]){
                doneidx[j] = !doneidx[j];
                doneidx[j-1] = !doneidx[j-1];
            }
        }
        else{
            break;
        }
    }
}

function done(){
    var tsk = document.getElementById("donewith").value;
    var k = 0;
    for(k = 0; k < tasks.length; k++){
        if(tsk == tasks[k]){
            doneTasks[doneTasks.length] = tasks[k];
            tasks[k] += " <b><i>(Done)</i></b>";
            doneidx[k] = false;
            break;
        }
    }
    updateDone();
    save_tasks(tasks);
}
function doneNum(){
    var tsk = document.getElementById("donewith").value;
    idx = Number(tsk)-1;
    if(doneidx[idx]){
        doneTasks[doneTasks.length] = tasks[idx];
        tasks[idx] += " <b><i>(Done)</i></b>"
        doneidx[idx] = false;
        updateDone();
        // saveCookies();
    }
    save_tasks(tasks);
    console.log(load_tasks());
}

function save_tasks(tasks) {
    chrome.storage.sync.set({ "tasks": tasks}, function(){
    });
}

function load_tasks() {
    chrome.storage.sync.get("tasks", function(returned) {
        return returned;
    });
}
