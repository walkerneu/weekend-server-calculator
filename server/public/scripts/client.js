console.log("ayo world, kinda sus");

let equationObject = {};
console.log (equationObject);

getEquations ();

function operatorButton (event) {
    event.preventDefault();
    equationObject.operator = event.target.value;
    }

function submitEquation (event) {
    event.preventDefault();
    equationObject.numOne = Number(document.getElementById("num1").value);
    equationObject.numTwo = Number(document.getElementById("num2").value);
    console.log(equationObject);
    if (equationObject.numOne === undefined){
        equationObject.numOne = 0;
        document.getElementById("num1").value = '0';
    }
    if (equationObject.numTwo === undefined){
        equationObject.numTwo = 0
        document.getElementById("num2").value = '0';
    }
    if (equationObject.operator === "+" || equationObject.operator === "-" || equationObject.operator === "*" || equationObject.operator === "/"){
    axios({
        method: 'POST',
        url: '/calculations',
        data: equationObject
        }).then((response) => {
            getEquations ()
        })
        }
    else {
        alert("You need to press an operator!");
    }
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
    let solutionDisplay = document.getElementById("solution-id");
    solutionDisplay.textContent = '';
    solutionDisplay.textContent = equations[equations.length-1].result;
    for (let equation of equations){
        equationList.innerHTML += `
        <li>${equation.numOne} ${equation.operator} ${equation.numTwo} = ${equation.result}</li>
        `
    }
}

function clearValues (event) {
    event.preventDefault();
    document.getElementById("num1").value = '';
    document.getElementById("num2").value = '';
    document.getElementById("solution-id").textContent = '';
    equationObject = {}
}


