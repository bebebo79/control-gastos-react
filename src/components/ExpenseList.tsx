import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"




export default function ExpenseList() {
    
    //llamamos al state con useBudget es la genealidad de context
    const { state } = useBudget()
    
    // creamos una constante para filtrar las categorias seleccionadas
    const expensesFilter = state.currentCategory ? state.expenses.filter(expense => state.currentCategory === expense.categories)
    : state.expenses
    
    //comprobamos que no hay gastos
    const isEmpty = useMemo(()=>expensesFilter.length === 0, [expensesFilter])


  return (
    <div className="mt-10 bg-white p-10 shadow-lg rounded-lg">
        {isEmpty ? 
        <p className="text-gray-600 text-2xl font-bold">No tienes ningun gasto</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                
                {expensesFilter.map(expense =>(
                    <ExpenseDetail
                        key = {expense.id}
                        expense = {expense}
                    
                    />
                ))}
            
            </>
        ) }
    
        
        
    </div>
  )
}
