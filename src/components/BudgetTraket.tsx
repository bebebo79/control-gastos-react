
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import "react-circular-progressbar/dist/styles.css"



export default function BudgetTraket() {

    // nos traemos el state del useBudget reducer
    const { state, totalExpenses,restoBudget, dispatch } = useBudget()
    //creamos la const del porcentaje
    const porcentaje = +((totalExpenses/state.budget)*100).toFixed(2)




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
           <CircularProgressbar
                value={porcentaje}
                styles={buildStyles({
                    pathColor : porcentaje === 100 ? "#DC2626"  : "#3b82f6",
                    trailColor : "#F5F5F5",
                    textSize: 8,
                    textColor:porcentaje === 100 ? "#DC2626"  : "#3b82f6",
                })}
                text={`${porcentaje}% Gastado`}
           />
        </div>
          
        <div className="flex flex-col gap-8 justify-center items-center">
            <button 
            type="button"
            className="bg-pink-600 w-full text-white uppercase  font-bold rounded-lg p-2"
            onClick={()=>dispatch({type:'reset-app'})}>
            Resetear App
            </button>
        
            <AmountDisplay 
                label = "Presupuesto"
                amount = {state.budget}
            />
            <AmountDisplay 
                label = "Disponible"
                amount = {restoBudget}
            />
            <AmountDisplay 
                label = "Gastado"
                amount = {totalExpenses}
            />

        </div> 
    </div>
  )
}
