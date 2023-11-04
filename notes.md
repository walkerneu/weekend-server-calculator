Lets go boiz

HTML: 

                boilerplate
                Create a form with two inputs
                    seperated by 
                four mathematical function buttons 
                an equals submit button
                a clear button 
                give all these id's

                Create an unordered list where the equations will go


CLIENT JS:

                create a global object, empty

                operator function
                    handles the operator buttons
                    object.operator = event.value ???
                        ^^if we put value="+" etc on the buttons???
                ???? maybe revist might not need -->>       disables the buttons

submit function
                    handles the form inputs
                    puts each of the inputed values into a seperate property of the global object
                    if statement to check if object has an operator
                    if yes
                    POST that object to the server
                    trigger a get function
                    else send an alert

                Get function
                    GET request
                    returns an array of objects that contain all of the equations and the solutions thus far
                    gives them to the render function
                    trigger a render function

                Render function
                    has an array of objects containing all of the equations thus far
                    clears the list area to display the new list
                    for of loop
                    loops through the array to display all of the equations with solutions
                    access the solution to the current problem at 
                    array[array.length-1].solution to display prominently
                    innerHTML that shit bay-bee

                Clear function
                    clears the values from the submit fields
                    ???undisables the +-*/ butons
                    resets the global object to empty


SERVER JS:

                boilerplate

                empty array that will contain all of the equations thus far

                math function
                    takes in an object with three properties:
                        a value
                        a value
                        an operator
                    series of if/else if statements
                    if operator = '+'
                        let whatever = Number(value) + Number(value)
                        object.solution = whatever
                        push it into the array
                    etc etc

                app.post that receives an object from the client
                triggers the math function

                app.get that sends the array to the client


CSS: Nothing for now, will think about if space, may be nescesary for stretch.

.btn:hover:not(:disabled)




Class notes:


axios is sending data as json by default
need to translate the json
npm install body parser

client server data


When to make a new route

.value = this is how we obtain the text that a user typed into an input 
    value="" is an attribute on an input element that stores that inputs current value

