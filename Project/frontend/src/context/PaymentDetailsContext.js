import { createContext, useReducer } from "react";

export const PaymentDetailssContext = createContext()

export const paymentDetailssReducer =(state, action)=>{
    switch (action.type) {
        case 'SET_PAYMENTDETAILSS':
            return{
                paymentDetailss: action.payload
            }
        case 'CREATE_METHOD':
            return{
                paymentDetailss:[action.payload, ...state.paymentDetailss]
            }
        case 'DELETE_PAYMENTDETAILS':
            return{
                paymentDetailss: state.paymentDetailss.filter((p)=>p._id !==action.payload._id)
            }
        default:
            return state
    }
}

export const PaymentDetailssContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(paymentDetailssReducer, {
        paymentdetailss :null
    })

    return(
        <PaymentDetailssContext.Provider value={{...state, dispatch}}>
            { children }
        </PaymentDetailssContext.Provider>
    )
}