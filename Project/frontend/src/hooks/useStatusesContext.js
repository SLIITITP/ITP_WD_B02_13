import { StatusesContext } from '../context/StatusContext'
import { useContext } from 'react'

export const useStatusesContext =()=>{
    const context = useContext(StatusesContext)

    if(!context){
        throw Error('useStatusesContext must be used inside an StausesContextProvider')
    }

    return context 
}