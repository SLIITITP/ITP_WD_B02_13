import { createContext, useReducer } from "react";

export const MethodsContext = createContext()

export const methodsReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_METHODS':
            return{
                methods: action.payload
            }
        case 'CREATE_METHOD':
            return{
                methods:[action.payload, ...state.methods]
            }
        case 'DELETE_METHOD':
            return{
                methods: state.methods.filter((m)=>m._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const MethodsContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(methodsReducer, {
        methods :null
    })

    return(
        <MethodsContext.Provider value={{...state, dispatch}}>
            { children }
        </MethodsContext.Provider>
    )
}