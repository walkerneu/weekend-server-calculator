console.log("ayo world, kinda sus");

let equationObject = {};
console.log (equationObject);

function operatorButton (event) {
    event.preventDefault();
    equationObject.operator = event.target.value;
    }

function submitEquation (event) {
    event.preventDefault();
    equationObject.num1 = document.getElementById("num1").value;
    equationObject.num2 = document.getElementById("num2").value;
    console.log(equationObject);
    if (equationObject.num1 === false){
        equationObject.num1 = 0;
    }
    if (equationObject.num2 === false){
        equationObject.num2 = 0
    }
    if (equationObject.operator === false){
        alert("You need to press an operator!");
    }
    else{
    axios({
        method: 'POST',
        url: '/calculations',
        data: equationObject
        }).then((response) => {
            getEquations ()
        })
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
    solutionDisplay.textContent = equations[equations.length-1].solution;
    for (let equation of equations){
        equationList.innerHTML += `
        <li>${equation.num1} ${equation.operator} ${equation.num2} = ${equation.solution}</li>
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


