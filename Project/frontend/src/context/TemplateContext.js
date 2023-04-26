import { createContext, useReducer } from "react";

export const TemplatesContext = createContext()

export const templatesReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_TEMPLATES':
            return{
                templates: action.payload
            }
        case 'CREATE_TEMPLATE':
            return{
                templates:[action.payload, ...state.templates]
            }
        case 'DELETE_TEMPLATE':
            return{
                templates: state.templates.filter((t)=>t._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const TemplatesContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(templatesReducer, {
        templates :null
    })

    return(
        <TemplatesContext.Provider value={{...state, dispatch}}>
            { children }
        </TemplatesContext.Provider>
    )
}