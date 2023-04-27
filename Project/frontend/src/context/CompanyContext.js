import { createContext, useReducer } from "react";

export const CompaniesContext = createContext()

export const companiesReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_COMPANIES':
            return{
                companies: action.payload
            }
        case 'CREATE_TEMPLATE':
            return{
                companies:[action.payload, ...state.companies]
            }
        case 'DELETE_TEMPLATE':
            return{
                companies: state.companies.filter((c)=>c._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const CompaniesContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(companiesReducer, {
        companies :null
    })

    return(
        <CompaniesContext.Provider value={{...state, dispatch}}>
            { children }
        </CompaniesContext.Provider>
    )
}