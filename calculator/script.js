class Calculator{
    constructor(previousOperandAndTextElement,currentOperandAndTextElement){
        this.previousOperandAndTextElement=previousOperandAndTextElement;
        this.currentOperandAndTextElement=currentOperandAndTextElement;
        this.clear();
    }

    clear(){
        this.previousOperand="";
        this.currentOperand="";
        this.operation=undefined;
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand=this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand==="") return;
        if(this.previousOperand!==""){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand="";
    }

    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const curr=parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case "+":
                computation=prev+curr;
                break;
            case "-":
                computation=prev-curr;
                break;
            case "*":
                computation=prev*curr;
                break;
            case "/":
                computation=prev/curr;
                break;
            default:
                return;
        }
        this.currentOperand=computation;
        this.previousOperand="";
        this.operation=undefined;
    }

    getNumber(number){
        const stringNumber=number.toString();
        const integerNumber=parseFloat(stringNumber.split(".")[0]);
        const decimalNumber=stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerNumber)){
            integerDisplay="";
        }
        else{
            integerDisplay=integerNumber.toLocaleString("en",{maxFractionDigits:0});
        }
        if(decimalNumber!=null){
            return `${integerDisplay}.${decimalNumber}`;
        }
        else{
            return integerDisplay;
        }
       
    }

    updateDisplay(){
        this.currentOperandAndTextElement.innerText=this.getNumber(this.currentOperand);
        if(this.operation!=null){
            this.previousOperandAndTextElement.innerText=`${this.getNumber(this.previousOperand)} ${this.operation}`;
        }
        else{
            this.previousOperandAndTextElement.innerText="";
        }
    }
};

var btnNumbers=document.querySelectorAll('[data-number]');
var btnOperation=document.querySelectorAll('[data-operation]');
var btnEqual=document.querySelector('[data-equal]');
var btnDelete=document.querySelector('[data-delete]');
var btnAllClear=document.querySelector('[data-all-clear]');
var previousOperandAndTextElement=document.querySelector('[data-prev-operand]');
var currentOperandAndTextElement=document.querySelector('[data-curr-operand]');

const calculator=new Calculator(previousOperandAndTextElement,currentOperandAndTextElement);

btnNumbers.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

btnOperation.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

btnAllClear.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
});

btnDelete.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
});

btnEqual.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
});