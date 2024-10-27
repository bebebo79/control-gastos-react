import { ReactNode } from "react"

type ErrorMensageProps ={
    
    children:ReactNode
}


export default function ErrorMensage({children}: ErrorMensageProps) {
  return (
    <p className="bg-red-700 p-2 text-white font-bold text-center">
        {children}
    </p>
  )
}
