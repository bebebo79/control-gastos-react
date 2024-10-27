import { useContext } from "react"
import { BudgerContext } from "../context/BudgetContext"



export const useBudget = ()=>{
    const context =  useContext(BudgerContext)
    if(!context) {
        throw new Error ('useBudget must be used  within a BudgetProvide')
        
    }
    return context

}