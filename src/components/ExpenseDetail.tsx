import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers";
import { Expense } from "../types";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";

type ExpenseDetailProps = {
    expense : Expense
    
    
}


export default function ExpenseDetail({expense} : ExpenseDetailProps) {

  // traemos el dispatch con elcustomHook
  const { dispatch } = useBudget() 
  
  //para traernos la info de catergorias, porque solo tenemos el id
  const categoyInfo = useMemo(()=> categories.filter(cat => cat.id === expense.categories)[0], [expense])

  // creamos las funciones de leadingAction
  const leadingAction = ()=> (
    <LeadingActions>
      <SwipeAction
        onClick={()=>dispatch({type:'get-expense-by-id', payload:{id : expense.id}})}
      
      >
        Actualizar
      </SwipeAction>

    </LeadingActions>

  )
  const trailingActions = ()=> (
    <TrailingActions>
      <SwipeAction
        onClick={()=> dispatch({type:'remove-expense', payload:{ id : expense.id}})}
        destructive= {true}
        
      
      >
        Eliminar
      </SwipeAction>

    </TrailingActions>

  )




  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingAction()}
        trailingActions={trailingActions()}
        
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex items-center gap-5">
          
          <div>
            <img src={`/icono_${categoyInfo.icon}.svg`} alt="icono categoria" className="w-20" />

          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-bold text-slate-500 uppercase">{categoyInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString())}</p>
          </div>
            <AmountDisplay
              amount={expense.amount}
            />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
