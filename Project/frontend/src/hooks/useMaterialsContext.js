import { MaterialsContext } from '../context/MaterialContext'
import { useContext } from 'react'

export const useMaterialsContext =()=>{
    const context = useContext(MaterialsContext)

    if(!context){
        throw Error('useMaterialsContext must be used inside an MaterialsContextProvider')
    }

    return context 
}