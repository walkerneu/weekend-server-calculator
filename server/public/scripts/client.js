console.log("ayo world, kinda sus");

let equationObject = {};
let calcNumber = ''
console.log (equationObject);

getEquations ();
enableNumbers ();
enableOperators ();

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
    disableOperators ();
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
    disableNumbers ();
}

function clearValues (event) {
    event.preventDefault();
    document.getElementById("display-id").textContent = '';
    equationObject = {};
    calcNumber = '';
    enableOperators ();
    enableNumbers ();
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