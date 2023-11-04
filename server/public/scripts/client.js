console.log("ayo world, kinda sus");

let equationObject = {};
let calcNumber = ''
console.log (equationObject);

getEquations ();

function makeNumber (event, num) {
    event.preventDefault();
    calcNumber += num;
    let display = document.getElementById("display-id");
    display.textContent += num;
}

function operatorButton (event) {
    event.preventDefault();
    let display = document.getElementById("display-id");
    display.textContent += event.target.value;
    equationObject.operator = event.target.value;
    equationObject.numOne = Number(calcNumber);
    calcNumber = '';
    document.getElementById("addButton").setAttribute("disabled", true);
    document.getElementById("subtractButton").setAttribute("disabled", true);
    document.getElementById("multiplyButton").setAttribute("disabled", true);
    document.getElementById("divideButton").setAttribute("disabled", true);
}

function submitEquation (event) {
    event.preventDefault();
    let display = document.getElementById("display-id");
    display.textContent += "=";
    equationObject.numTwo = Number(calcNumber);
    console.log(equationObject);
        axios({
            method: 'POST',
            url: '/calculations',
            data: equationObject
        }).then((response) => {
            getEquations ()
        })
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
    display.textContent += equations[equations.length-1].result;
    for (let equation of equations){
        equationList.innerHTML += `
        <li>${equation.numOne} ${equation.operator} ${equation.numTwo} = ${equation.result}</li>
        `
    }
}

function clearValues (event) {
    event.preventDefault();
    document.getElementById("display-id").textContent = '';
    equationObject = {};
    calcNumber = '';
    document.getElementById("addButton").removeAttribute("disabled");
    document.getElementById("subtractButton").removeAttribute("disabled");
    document.getElementById("multiplyButton").removeAttribute("disabled");
    document.getElementById("divideButton").removeAttribute("disabled");
    // document.getElementById("attack1").removeAttribute("disabled");
    // document.getElementById("attack1").removeAttribute("disabled");
    // document.getElementById("attack1").removeAttribute("disabled");
    // document.getElementById("attack1").removeAttribute("disabled");
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
