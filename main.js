class Calculator{
    constructor(previousOperandElement,currentOperandElement){
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear(){
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    delete(){
        this.current = this.current.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number
    }
    chooseOperation(operator){
        if(this.current === '') return
        if(this.previous !==''){
            this.compute()
        }
        this.operation = operator
        this.previous = this.current
        this.current = ''
    }
    compute(){
        let result
        let prev = parseFloat(this.previous)
        let curr = parseFloat(this.current)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '/':
                result = prev / curr
                break
            default:
                return
        }
        this.current = result
        this.operation = undefined
        this.previous = ''
    }
    updateDisplay(){
        this.currentOperandElement.innerText = this.current
        if(this.operation != null){
            this.previousOperandElement.innerText = 
            `${this.previous} ${this.operation}`
        }else{
            this.previousOperandElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-allclear]')
const previousOperandElement = document.querySelector('[data-previous]')
const currentOperandElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandElement,currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})