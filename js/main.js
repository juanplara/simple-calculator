// Select all <button> elements in the document
const buttons = document.querySelectorAll('button')

// Select the element that displays the screen of the calculator
const screen = document.querySelector('.screen')

// This will store the current operation as a string (e.g. "2+3")
let operation = ''

// This flag is used to determine if the next number should reset the screen
let resetScreen = false

// Loop through each button and attach a click event listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the text content of the clicked button
        const buttonText = button.textContent

        // Handle the "C" (clear) button
        if (buttonText === 'C') {
            operation = ""         // reset operation
            screen.value = '0'     // reset the screen display
        } 
        // Handle the "=" (equals) button
        else if (buttonText === '=') {
            try {
                // Use eval to evaluate the string expression
                operation = eval(operation)
                screen.value = operation   // display the result
                resetScreen = true         // set flag to reset on next input
            } catch (error) {
                screen.value = 'Error'     // show error if eval fails
                operation = ''             // reset operation
            }
        }
        // Handle the "±" (plus/minus) toggle button
        else if (buttonText === '±') {
            if (operation) {
                // If operation starts with '-', remove it to make positive
                if (operation.startsWith('-')) {
                    operation = operation.substring(1)
                } else {
                    // Otherwise add '-' in front to make negative
                    operation = '-' + operation
                }
                screen.value = operation
            } else if (operation === '%') {
                // This seems incorrect or leftover logic for '%'
                // Could attempt to convert to percentage (not typical on ±)
                operation = String(eval(operation + '/100'))
                screen.value = operation
            }
        } 
        // Handle all other buttons (numbers and operators)
        else {
            // If last operation ended with '=', start fresh with this number
            if (resetScreen && !isNaN(buttonText)) {
                operation = buttonText     // start new input
                resetScreen = false
            } else {
                // Otherwise, keep building the operation string
                operation += buttonText
            }
            screen.value = operation
        }
    })
})
