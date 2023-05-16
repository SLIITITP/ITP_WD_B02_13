import { createContext, useReducer } from "react";

export const StatusesContext = createContext()

export const statusesReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_STATUSES':
            return{
                statuses: action.payload
            }
        case 'CREATE_STATUS':
            return{
                statuses:[action.payload, ...state.statuses]
            }
        case 'DELETE_STATUS':
            return{
                statuses: state.statuses.filter((c)=>c._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const StatusesContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(statusesReducer, {
        statuses :null
    })

    return(
        <StatusesContext.Provider value={{...state, dispatch}}>
            { children }
        </StatusesContext.Provider>
    )
}