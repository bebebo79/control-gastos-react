import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    // Pasamos el State
    const[budget,setBudget] = useState(0)
    // Pasmos el useBudget
    const {dispatch} = useBudget()

    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        setBudget(e.target.valueAsNumber)
        
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        dispatch({type:'add-budget', payload:{budget}})
    
    }
  

    const isValid = useMemo(() =>{
        return isNaN(budget) || budget <=0

    }, [budget])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-blue-600 text-center font-bold text-4xl">
                Definir Presupuesto
            </label>
            <input type="number" 
                    className="w-full bg-white border border-gray-200 p-2 "
                    id="budget"
                    placeholder="Aquí tu Presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                    
            />

        </div>
        <input 
            type="submit"
            value="Definir Presupuesto"
            className="bg-blue-800 hover:bg-blue-700 cursor-pointer w-full text-white font-black p-2 uppercase disabled:opacity-40"
            disabled = {isValid}
            

        
        />
    </form>
  )
  
}
