import { PaymentDetailssContext } from '../context/PaymentDetailsContext'
import { useContext } from 'react'

export const usePaymentDetailssContext =()=>{
    const context = useContext(PaymentDetailssContext)

    if(!context){
        throw Error('usePaymentDetailssContext must be used inside an PaymentdetailssContextProvider')
    }

    return context
}