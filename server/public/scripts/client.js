console.log("ayo world, kinda sus");

// global object "equationObject" and global string "calcNumber"
// calcNumber holds the input from the display, that will then be
// split into the values we put in the equationObject

let equationObject = {};
let calcNumber = ''
console.log (equationObject);

getEquations ();

// makeNumber is an onclick function that handles each of the
// number buttons on the calculator and the decimal
// the corresponding value to each button is passed into the
// function at the event of the onclick, is added to the
// display on the DOM and added to the global calcNumber string

function makeNumber (event, num) {
    event.preventDefault();
    calcNumber += num;
    let display = document.getElementById("display-id");
    display.value += num;
}

// operatorButton is an onclick function that handles the four
// operator buttons. When triggered it adds the corresponding
// operator to the display on the DOM, adds it to the operator
// property of the equationObject, and adds it to the global
// calcNumber string. It then triggers the disable operators
// function that prevents you from having multiple operators
// in an equation.

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

// submitEquation function, triggered by the onclick of the
// "=" button, checks to make sure an operator has been clicked,
// takes the calcNumber string and splits it at the point of
// the operator, making two values in an array, and then puts
// each of those values into the corresponding numOne and numTwo
// properties of the equationObject
// This then triggers a POST request to the server, 
// sending the equationObject for the server to do the math
// the response triggers the getEquations function
// Defensive code here, where if the operator has not been
// clicked, the user will receive an alert
// this function finally triggers the enableOperators function

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

// getEquations function is a GET request to receive an array
// from the server of all the calculations done thus far
// the response takes the array from the response.data
// and plugs it into the renderValues function

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

// renderValues function clears the equation history list
// to prepare the new list
// the server is adding a result property to each object
// so the function accesses the most recent equation's
// result property to display it on the DOM
// It resets the calcNumber string to the result as well
// so that this value can then be further manipulated by
// the user (this sentence felt gross to type)
// The function then loops through the array
// And adds each equation as it's own div block in the
// HTML of the equation list. 
// Here we put the recallEquation function on each div, 
// so the equation can be recalled onclick
// Finally, the equation clears the global equationObject
// for the next equation

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

// clearValues function is an onclick function triggered by
// the clear button. It clears the value of the display field
// on the DOM, resets the global equationObject, and the
// calcNumber string, and it runs the enableOperators function
// to reallow operator button functionality

function clearValues (event) {
    event.preventDefault();
    document.getElementById("display-id").value = '';
    equationObject = {};
    calcNumber = '';
    enableOperators ()
}

// clearHistory function is an onclick function triggered by the
// Clear History button, it sends a DELETE request to the server
// which triggers the server to clear the history of equations
// the response from the server sends the empty array
// and triggers the renderValues function with that array
// to clear the screen
// this also triggers the clearValues function to reset all
// values

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

// deleteChar function is an onclick function triggered by
// the delete button. It gets the current value of the display
// accesses the last character, determines if its an operator
// if it is, it reenables the operator buttons for use
// .slice is then used to slice the last character of the
// calcNumber string, and the last value of the DOM display

function deleteChar (event) {
    event.preventDefault();
    let displayValue = document.getElementById("display-id").value
    console.log("This is the character you're deleting:", displayValue[displayValue.length-1]);
    if (displayValue[displayValue.length-1] === "+" || "-" || "*" || "/"){
        console.log("This is the calcNumber:", calcNumber);
        enableOperators ()
    }
    calcNumber = calcNumber.slice(0, -1);
    document.getElementById("display-id").value = document.getElementById("display-id").value.slice(0, -1);
}

// recallEquation function is an onclick function triggered by
// clicking any of the equations displayed in the equation history
// When clicked, the function accesses the textContent of the
// clicked div, loops through it to determine the operator,
// and resets the operator property of the global equationObject
// It then splits the string at the '=' value, into two seperate
// values in an array, and takes the first value of the array,
// which is the equation without the result, and displays
// it on the DOM, as well as setting the calcNumber string
// to that equation string so that the equation can be
// ..... manipulated by the user ( D: )
// or immediatley reran to get it's result

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

// down here we're only using the enableOperators and disableOperators
// for now. Used to enable and disable the operator buttons as a
// means of defensive code, since the system can only handle
// two numbers right now

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