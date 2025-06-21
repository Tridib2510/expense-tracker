document.addEventListener('DOMContentLoaded', () => {

    const expenseForm=document.getElementById('expense-form');
    const expenseNameInput=document.getElementById('expense-name');
    const expenseAmoutInput=document.getElementById('expense-amount');
    const expenseList=document.getElementById('expense-list');
    const totalAmountDisplay=document.getElementById('total-amount');

    let expenses=JSON.parse(localStorage.getItem('expenses'))||[]
    renderExpenses();
    let totalAmount=calculateTotal()

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name=expenseNameInput.value.trim()

      const amount=parseFloat(expenseAmoutInput.value.trim())
       
      if(name!=='' && !isNaN(amount) && amount>0){
        const expense={
            id:Date.now(),
            name,
            amount
        }
        expenses.push(expense);
        saveExpensesTolocal()
        updateTotal()
        renderExpenses()
        //clear input
        expenseNameInput.value='';
        expenseAmoutInput.value='';

      }



    })
    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){
         const expenseId=parseInt(e.target.getAttribute('data-id'))
         expenses=expenses.filter(expense=>expense.id!==expenseId);   
         saveExpensesTolocal();
         renderExpenses();
         updateTotal();
        }

    })
   
function renderExpenses(){
    expenseList.innerHTML='';
    expenses.forEach(expense=>{
        const li=document.createElement('li')
        li.innerHTML=`${expense.name}-$${expense.amount}
        <button data-id="${expense.id}">delete</button>
        `
        expenseList.appendChild(li);

    })
}


    function saveExpensesTolocal(){
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }

    function calculateTotal() {
      //reduce js
      //const array1=[1,2,3,4]
     //const initialValue=0;
     //const sumWithInitial=array1.reduce(
    //  (accumulator,currentValue)=>accumulator+currentValue,
    //initialValue,
    // ); ouput-->10

    return expenses.reduce((sum,expense)=>sum+expense.amount,0)
    }

 function updateTotal(){
    totalAmount=calculateTotal();
   totalAmountDisplay.textContent=totalAmount;
 }

})