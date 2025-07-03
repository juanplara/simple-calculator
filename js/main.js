const buttons = document.querySelectorAll('button')
const screen = document.querySelector('.screen')

let operation = ''
let resetScreen = false

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent

        if (buttonText === 'C') {
            operation = ""
            screen.value = '0'
        } else if (buttonText === '=') {
            try {
                operation = eval(operation)
                screen.value = operation
                resetScreen = true
            } catch (error) {
                screen.value = 'Error'
                operation = ''
            }
        }else if (buttonText === '±') {
            if (operation) {
                if (operation.startsWith('-')) {
                    operation = operation.substring(1)
                } else {
                    operation = '-' + operation
                }
                screen.value = operation
            } else if (operation === '%') {
                operation = String(eval(operation + '/100'))
                screen.value = operation
            }
        }else {
            if (resetScreen && !isNaN(buttonText)) {
                operation = buttonText
                resetScreen = false
            }else {
                operation += buttonText
            }
            screen.value = operation
        }
    })
})