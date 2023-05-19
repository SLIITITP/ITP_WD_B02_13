import { DeliverydsContext } from '../context/DeliverydContext'
import { useContext } from 'react'

export const useDeliverydsContext =()=>{
    const context = useContext(DeliverydsContext)

    if(!context){
        throw Error('useDeliverydsContext must be used inside an DeliverydsContextProvider')
    }

    return context 
}