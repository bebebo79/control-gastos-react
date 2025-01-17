import { v4 as uuidv4} from "uuid"
import { Category, DraftExpense, Expense } from "../types"

// Acciones
export type BudgetActions =
{type:"add-budget", payload:{budget: number}} |
{type: "show-modal"} |
{type:'close-modal'} |
{type:'add-expense', payload: {expense : DraftExpense}} |
{type:'remove-expense', payload: {'id' : Expense['id']}} |
{type: 'get-expense-by-id', payload : {'id':Expense['id']}} |
{type: 'update-expense',payload : {expense :Expense}} |
{type: 'reset-app'} |
{type: 'add-filter-category', payload: {id: Category['id']}}

// State del contro de gastos
export type BudgetState = {
    budget: number
    modal: boolean
    expenses : Expense[]
    editingId : Expense['id']
    currentCategory : Category['id']
}

// funcion para que genere un gasto ya con su id
const createExpense = (draftExpense : DraftExpense) : Expense =>{
    return{
        ...draftExpense,
        id : uuidv4()
    }
}

// funcion para localstorage al presupuesto
const initialBudget = () : number =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

// funcion para localstorage al gasto
const localStorageExpense = () : Expense[]=>{
    const localStorageExpense = localStorage.getItem('expense')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []

}
// como inicia cada campo del state
export const initialState  : BudgetState= {
    budget : initialBudget(),
    modal: false,
    expenses : localStorageExpense(),
    editingId : '',
    currentCategory : ''

}


//definimos que hacen nuestras acciones
export const budgetReducer = (
    state : BudgetState = initialState,
    actions :BudgetActions
) => {

    if(actions.type === 'add-budget'){
        return {
            ...state,
            budget: actions.payload.budget
        }
    }
    if(actions.type === 'show-modal') {
        return {
            ...state,
            modal:true
        }
    }
    if(actions.type==='close-modal') {
        return {
            ...state,
            modal : false,
            editingId :
             ''
        }
    }
    if(actions.type === 'add-expense') {
        const expense = createExpense(actions.payload.expense)
        return {
            ...state,
            expenses : [...state.expenses, expense],
            modal : false

        }
    }

    if(actions.type === 'remove-expense') {
        return {
            ...state,
            expenses : state.expenses.filter(expense => expense.id !== actions.payload.id)
        }
    }
    if(actions.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId : actions.payload.id,
            modal : true
        }
    }
    if(actions.type === 'update-expense') {
        return {
            ...state,
            expenses : state.expenses.map(expense => expense.id === actions.payload.expense.id ? actions.payload.expense : expense),
            modal: false,
            editingId : ''
        }
    }
    if(actions.type === 'reset-app'){
    
        return {
          ...state,
          expenses : [],
          budget : 0
          
        }
    } 
    if(actions.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory : actions.payload.id
        }
    }
    


    return state

}