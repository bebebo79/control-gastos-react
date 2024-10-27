import { createContext, useReducer, Dispatch, ReactNode } from "react"
import { budgetReducer,BudgetState,initialState, BudgetActions } from "../reducers/budget-reducer"
import { useMemo } from "react"



//creamos los proops de budgercontext y de provider
type BudgerContextProops = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses : number
    restoBudget:number
}

type BudgerProviderProops = {
    children : ReactNode
}

// creamos el Context
export const BudgerContext = createContext<BudgerContextProops>(null!)



// definimo de donde proviene 
export const BudgerProvider = ({children} : BudgerProviderProops )=> {

    const [state,dispatch] = useReducer(budgetReducer, initialState)

    //creamos la variable para el total de gastos con useMemo
    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense)=> total + expense.amount, 0), [state.expenses])
    const restoBudget = state.budget - totalExpenses



    return (
        <BudgerContext.Provider
            value = {{
                state,
                dispatch,
                totalExpenses,
                restoBudget
               
            }}
        >
            {children}
        </BudgerContext.Provider>

    )
}