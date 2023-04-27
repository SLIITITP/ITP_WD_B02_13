import { createContext, useReducer } from "react";

export const MaterialsContext = createContext()

export const materialsReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_MATERIALS':
            return{
                materials: action.payload
            }
        case 'CREATE_MATERIAL':
            return{
                materials:[action.payload, ...state.materials]
            }
        case 'DELETE_MATERIAL':
            return{
                materials: state.materials.filter((m)=>m._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const MaterialsContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(materialsReducer, {
        materials :null
    })

    return(
        <MaterialsContext.Provider value={{...state, dispatch}}>
            { children }
        </MaterialsContext.Provider>
    )
}