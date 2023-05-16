import { MethodsContext } from '../context/MethodContext'
import { useContext } from 'react'

export const useMethodsContext =()=>{
    const context = useContext(MethodsContext)

    if(!context){
        throw Error('useMethodsContext must be used inside an MethodsContextProvider')
    }

    return context
}