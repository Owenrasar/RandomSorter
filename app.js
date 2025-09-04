console.log("we", "connected")

let numberData = []
let disArr = []

let makeButton = document.querySelector("#makeButton")
let sortButton = document.querySelector("#sortButton")
let resetButton = document.querySelector("#resetButton")

let body = document.querySelector("body")
let logUl = document.querySelector("#log")
let curlist = []


fetch('https://api.jsonbin.io/v3/b/68b9b49eae596e708fe26fba')

.then(function(response) {
    console.log(response)
    response.json().then(function(data){
        for (let i = 0; i<data.record.length;i++){
        numberData.push(data.record[i])
        }
    })
});

makeButton.onclick = function() {
    curlist = numberData.slice().sort(() => 0.5 - Math.random()).slice(0, 7);
    let text = "Made list: " + curlist.map(item => item.name + ("(" + item.value + ")")).join(", ");

	let li = document.createElement("li")
	li.innerHTML = text
	logUl.prepend(li)
}

resetButton.onclick = function() {
    curlist = []
    while (logUl.firstChild) {
        logUl.removeChild(logUl.firstChild);
    }
}


sortButton.onclick = function() {
    if (curlist.length == 0){
        let text = "Error: create a list first";
        let li = document.createElement("li")
        li.innerHTML = text
        logUl.prepend(li)
    } else {
        if (checkSort() == false)
        {
            randBubble()
            let text = "New list: " + curlist.map(item => item.name + ("(" + item.value + ")")).join(", ");

            let li = document.createElement("li")
            li.innerHTML = text
            logUl.prepend(li)

            if (checkSort()){
                let text = "List has been sorted";

                let li = document.createElement("li")
                li.innerHTML = text
                logUl.prepend(li)
            }
        } else {
            let text = "List has already been sorted";

            let li = document.createElement("li")
            li.innerHTML = text
            logUl.prepend(li)
        }
        
    }
}
function checkSort() {
    let sorted = true
    let prevItem = curlist[0].value;
    for (let i = 1; i<curlist.length;i++){
        if (prevItem > curlist[i].value) {
            sorted = false
        }
        prevItem = curlist[i].value
    }
    return sorted
}
function randBubble(){
    let num1 = -1
    let num2 = -1
    let ran1 = -1
    let ran2 = -1
    while (num1 <= num2 || ran1 >= ran2){
        ran1 = Math.floor(Math.random() * 7)
        ran2 = Math.floor(Math.random() * 7)
        num1 = curlist[ran1].value
        num2 = curlist[ran2].value
    }
    [curlist[ran1], curlist[ran2]] = [curlist[ran2], curlist[ran1]]
    let text = "Swapped: " + curlist[ran1].name + " and " + curlist[ran2].name;

    let li = document.createElement("li")
    li.innerHTML = text
    logUl.prepend(li)
}


/*
fetch('https://api.disneyapi.dev/character')

.then(function(response) {
    response.json().then(function(data){
        for (let i = 0; i<data.data.length;i++){
        disArr.push(data.data[i].name)
        }

        disArr.forEach(function(item){
            console.log(item)
        })
    })
});
*/



