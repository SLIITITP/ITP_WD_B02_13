import { TemplatesContext } from '../context/TemplateContext'
import { useContext } from 'react'

export const useTemplatesContext =()=>{
    const context = useContext(TemplatesContext)

    if(!context){
        throw Error('useTemplatesContext must be used inside an TemplatesContextProvider')
    }

    return context 
}