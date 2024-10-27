/// type de Expense
export type Expense = {
    id: string
    expenseName : string
    amount : number
    categories: string
    date: Value
    

}

// type de la previa a type de expensive sin el id
export type DraftExpense = Omit<Expense, 'id' >


// type necesarios para el calendario
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// type de chategories
export type Category = {
    id: string
    name: string
    icon: string
}