import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTraket from "./components/BudgetTraket"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategories from "./components/FilterByCategories"


function App() {
  
  const {state}  = useBudget()

  const isValidBudget= useMemo(()=> state.budget > 0 , [state.budget])

  // usamos localstorage para mantener nuestro state, siempre hay que pasarlo a string
   useEffect(()=>{    
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expense', JSON.stringify(state.expenses))
  },[state])
  

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase font-bold text-center text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="bg-white max-w-3xl mx-auto shadow-lg rounded-lg mt-10 p-10">

        {isValidBudget ? <BudgetTraket/>  : <BudgetForm/> }
        
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategories/>
          <ExpenseList/>   
          <ExpenseModal/>
        </main>
      )}
      
    </>
  )
}

export default App
