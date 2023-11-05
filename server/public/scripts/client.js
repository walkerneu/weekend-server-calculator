console.log("ayo world, kinda sus");

let equationObject = {};
let calcNumber = ''
console.log (equationObject);

getEquations ();

function makeNumber (event, num) {
    event.preventDefault();
    calcNumber += num;
    let display = document.getElementById("display-id");
    display.value += num;
}

function operatorButton (event) {
    event.preventDefault();
    let display = document.getElementById("display-id");
    display.value += event.target.value;
    equationObject.operator = event.target.value;
    calcNumber += event.target.value;
    // equationObject.numOne = Number(calcNumber);
    // calcNumber = '';
    disableOperators ();
}

function submitEquation (event) {
    event.preventDefault();
    if (equationObject.operator !== undefined){
    // let display = document.getElementById("display-id");
    // display.value += "=";
    let splitArray = calcNumber.split(equationObject.operator);
    equationObject.numOne = Number(splitArray[0]);
    equationObject.numTwo = Number(splitArray[1]);
    console.log(equationObject);
        axios({
            method: 'POST',
            url: '/calculations',
            data: equationObject
        }).then((response) => {
            getEquations ()
        })
    }
    else {
        alert("You need to input a valid equation!")
    }
    enableOperators ()
    }

function getEquations () {
    axios({
        method: 'GET',
        url: '/calculations'
        }).then((response) => {
            console.log(response.data);
            let equationArray = response.data;
            renderValues (equationArray)
        })
    }

function renderValues (equations) {
    let equationList = document.getElementById("equationList");
    equationList.innerHTML = '';
    let display = document.getElementById("display-id");
    display.value = equations[equations.length-1].result;
    calcNumber = `${equations[equations.length-1].result}`;
    console.log(calcNumber);
    for (let equation of equations){
        equationList.innerHTML += `
        <div class="history-item" onclick="recallEquation (event)">${equation.numOne}${equation.operator}${equation.numTwo}=${equation.result}</div>
        `
    }
    equationObject = {};
}

function clearValues (event) {
    event.preventDefault();
    document.getElementById("display-id").value = '';
    equationObject = {};
    calcNumber = '';
    enableOperators ()
}

function clearHistory (event) {
    event.preventDefault();
    console.log('clear me baby');
    axios({
        method: 'DELETE',
        url: '/calculations'
        }).then((response) => {
            console.log(response.data);
            let equationArray = response.data;
            renderValues (equationArray)
        })
    clearValues(event);
}

function deleteChar (event) {
    event.preventDefault();
    let displayValue = document.getElementById("display-id").value
    console.log("This is the character you're deleting:", displayValue[displayValue.length-1]);
    if (displayValue[displayValue.length-1] === "+" || "-" || "*" || "/"){
        document.getElementById("display-id").value = document.getElementById("display-id").value.slice(0, -1);
        console.log("This is the calcNumber:", calcNumber);
        calcNumber = calcNumber.slice(0, -1);
        enableOperators ()
    }
    else {
    calcNumber = calcNumber.slice(0, -1);
    document.getElementById("display-id").value = document.getElementById("display-id").value.slice(0, -1);
    }
}

function recallEquation (event) {
    event.preventDefault();
    let recallText = event.target.textContent;
    for (let i = 0; i<recallText.length; i++){
        if (recallText[i] === "+"){
            equationObject.operator = "+";
        }
        else if (recallText[i] === "*"){
            equationObject.operator = "*";
        }
        else if (recallText[i] === "/"){
            equationObject.operator = "/";
        }
        else if (recallText[i] === "-"){
            equationObject.operator = "-";
        }
    }
    let splitArray = recallText.split("=");
    document.getElementById("display-id").value = splitArray[0];
    calcNumber = splitArray[0];

}

function disableOperators () {
    document.getElementById("addButton").setAttribute("disabled", true);
    document.getElementById("subtractButton").setAttribute("disabled", true);
    document.getElementById("multiplyButton").setAttribute("disabled", true);
    document.getElementById("divideButton").setAttribute("disabled", true);
}

function disableNumbers () {
    document.getElementById("id-0").setAttribute("disabled", true);
    document.getElementById("id-1").setAttribute("disabled", true);
    document.getElementById("id-2").setAttribute("disabled", true);
    document.getElementById("id-3").setAttribute("disabled", true);
    document.getElementById("id-4").setAttribute("disabled", true);
    document.getElementById("id-5").setAttribute("disabled", true);
    document.getElementById("id-6").setAttribute("disabled", true);
    document.getElementById("id-7").setAttribute("disabled", true);
    document.getElementById("id-8").setAttribute("disabled", true);
    document.getElementById("id-9").setAttribute("disabled", true);
    document.getElementById("id-dec").setAttribute("disabled", true);

}

function disableSubmit () {

}

function enableOperators () {
    document.getElementById("addButton").removeAttribute("disabled");
    document.getElementById("subtractButton").removeAttribute("disabled");
    document.getElementById("multiplyButton").removeAttribute("disabled");
    document.getElementById("divideButton").removeAttribute("disabled");
}

function enableNumbers () {
    document.getElementById("id-0").removeAttribute("disabled");
    document.getElementById("id-1").removeAttribute("disabled");
    document.getElementById("id-2").removeAttribute("disabled");
    document.getElementById("id-3").removeAttribute("disabled");
    document.getElementById("id-4").removeAttribute("disabled");
    document.getElementById("id-5").removeAttribute("disabled");
    document.getElementById("id-6").removeAttribute("disabled");
    document.getElementById("id-7").removeAttribute("disabled");
    document.getElementById("id-8").removeAttribute("disabled");
    document.getElementById("id-9").removeAttribute("disabled");
    document.getElementById("id-dec").removeAttribute("disabled");

}

function enableSubmit () {

}