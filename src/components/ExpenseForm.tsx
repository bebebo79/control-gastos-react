import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import type { DraftExpense,Value } from "../types";
import { ChangeEvent, FormEvent } from "react";
import ErrorMensage from "./ErrorMensage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {


    //usamos el useBudget para llamar a dispatch y nuestras acciones
    const { dispatch, state, restoBudget } = useBudget()


    // generamos el state
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName : '',
        amount : 0,
        categories: '',
        date: new Date()
    })

    //state de error para poder usarlo de manera dinamica
    const [error, setError] = useState('')

    //state de cantidad previa al gasto, antes de grabar
    const [previuAmount, setPreviuAmount] = useState(0)

    // solicitamos el state, para poder modificar un state ya creado
    useEffect(()=>{
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviuAmount(editingExpense.amount)
        }
    },[state.editingId])

  // handlear el state con los datos que vamos introduciendo (datos y la fecha)
    const handlerChange = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target
        const isAmauntField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name] : isAmauntField ? +value : value
        })

    }
    const handlerChangeDate = (value : Value)=>{
            setExpense ( { 
            ...expense,
            date : value
        } )
    }


    

    //validamos el state que no se quede ningun campo a rellenar
    const handlerSubmit = (e:FormEvent<HTMLFormElement>) =>{ 
        e.preventDefault()
        //validar que no este vacio ningun cambio
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios ')
            return
        }
        //validamos que no nos pasamos del presupuesto
        if((expense.amount - previuAmount) > restoBudget) {
            setError('Sobrepasas el presupuesto')
            return
        }
        // agregar o actualizar el gasto
        if(state.editingId){
            dispatch({type:'update-expense', payload:{expense : {id : state.editingId, ...expense}}})

        }else {
            dispatch({type:'add-expense', payload:{expense}}) 
            
        }
    

        //una vez que tenemos el state  volvemos a los valores iniciales
        setExpense({
            expenseName : '',
            amount : 0,
            categories: '',
            date: new Date()    

        })
        setPreviuAmount(0) 
        
    }
    

    return (
        <form className="space-y-5" onSubmit={handlerSubmit}>
            
            <legend className="text-2xl uppercase text-center font-black border-b-4 border-blue-500 p-2">
                {state.editingId ? 'Modificar Gasto' : 'Nuevo Gasto'}
            </legend>
            
            {error && <ErrorMensage>{error}</ErrorMensage>}
            
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto: 
                </label>
                <input type="text" 
                        name="expenseName" 
                        placeholder="Añade el nombre del gasto"
                        className="bg-slate-100 p-2"
                        id="expenseName" 
                        onChange={handlerChange}
                        value={expense.expenseName}                       
                />
                        
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad : 
                </label>
                <input type="number" 
                        name="amount" 
                        placeholder="Añade el importe del gasto"
                        className="bg-slate-100 p-2"
                        id="amount" 
                        onChange={handlerChange}
                        value={expense.amount}
                       
                        
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="categories" className="text-xl">
                    Cantegoría : 
                </label>
                <select name="categories"
                        className="bg-slate-100 p-2"
                        id="categories"
                        onChange={handlerChange}
                        value={expense.categories}                       
                >
                <option value=" ">-- selecciona la categoria --</option>

                {categories.map(category => (
                    <option  key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}        

                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">
                    Fecha Gasto: 
                </label>
                <DatePicker className="bg-slate-100 p-2 border-0"
                            value={expense.date}
                            onChange={handlerChangeDate}
                            
                           />
            </div>

            

            <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                    value={state.editingId ? 'Confirmar Cambio' : 'Registrar Gastos'}
                    
                    
            
            />
        </form>
    )
}
