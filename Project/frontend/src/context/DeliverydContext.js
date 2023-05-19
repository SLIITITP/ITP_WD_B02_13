import { createContext, useReducer } from "react";

export const DeliverydsContext = createContext()

export const deliverydsReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_DELIVERYDS':
            return{
                deliveryds: action.payload
            }
        case 'CREATE_DELIVERY':
            return{
                deliveryds:[action.payload, ...state.deliveryds]
            }
        case 'DELETE_COMPANY':
            return{
                deliveryds: state.deliveryds.filter((c)=>c._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const DeliverydsContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(deliverydsReducer, {
        deliveryds :null
    })

    return(
        <DeliverydsContext.Provider value={{...state, dispatch}}>
            { children }
        </DeliverydsContext.Provider>
    )
}