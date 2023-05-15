import { createContext, useReducer } from "react";

export const PrintTypesContext = createContext()

export const printtypesReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_PRINTTYPES':
            return{
                printtypes: action.payload
            }
        case 'CREATE_PRINTTYPE':
            return{
                printtypes:[action.payload, ...state.printtypes]
            }
        case 'DELETE_PRINTTYPE':
            return{
                printtypes: state.printtypes.filter((p)=>p._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const PrintTypesContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(printtypesReducer, {
        printtypes :null
    })

    return(
        <PrintTypesContext.Provider value={{...state, dispatch}}>
            { children }
        </PrintTypesContext.Provider>
    )
}