import { PrintTypesContext } from '../context/PrintTypeContext'
import { useContext } from 'react'

export const usePrintTypesContext =()=>{
    const context = useContext(PrintTypesContext)

    if(!context){
        throw Error('usePrintTypessContext must be used inside an PrintTypesContextProvider')
    }

    return context 
}