import { createContext, useMemo, useReducer ,ReactElement} from "react"

export type CartType = {
    sku: string,
    name: string,
    price: number,
    quantity: number,
    
}
 
type CartStateType = {cart: CartType[]}

const initialCartState :CartStateType = {cart: []}

enum REDUCER_ACTION_TYPE {
    ADD,
    REMOVE,
    QUANTITY,
    SUBMIT
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: CartType
}

const reducer = (state:CartStateType, action:ReducerAction):CartStateType => {
    switch(action.type) {
        case REDUCER_ACTION_TYPE.ADD:{
            if (!action.payload) {
                throw new Error("Invalid payload")
            }
            const {sku, name, price} = action.payload
            const filteredCart :CartType[]= state.cart.filter((item) => item.sku !== sku)
            const itemExist:CartType|undefined = state.cart.find((item) => item.sku === sku)
            const quantity:number = itemExist ? itemExist.quantity + 1 : 1
            return {...state, cart: [...filteredCart, {sku, name, price, quantity}] }
        }

        case REDUCER_ACTION_TYPE.REMOVE:{
            if (!action.payload) {
                throw new Error("Invalid payload")
            }
            const {sku} = action.payload
            const filteredCart :CartType[]= state.cart.filter((item) => item.sku !== sku)
            return{...state,cart: [...filteredCart]}
        }

        case REDUCER_ACTION_TYPE.QUANTITY:{
            if (!action.payload) {
                throw new Error("Invalid payload")
            }
            const {sku, quantity} = action.payload
            const itemExists: CartType | undefined = state.cart.find((item) => item.sku === sku)
            const filteredCart :CartType[]= state.cart.filter((item) => item.sku !== sku)
            if (!itemExists) {
                throw new Error("Item does not exist")
            }
            const updatedItem: CartType = {...itemExists, quantity}
            return {...state,cart:[...filteredCart, updatedItem]}
        }
        case REDUCER_ACTION_TYPE.SUBMIT:
            return {...state, cart: []}
        default:
            throw new Error   
    }
}


const useCartContext = (initCartState:CartStateType) => {
    const [state,dispatch] = useReducer(reducer,initCartState)

    const REDUCER_ACTION = useMemo(() => {
        return REDUCER_ACTION_TYPE
    },[])

    const totalItems:number = state.cart.reduce((prev,cartvalue)=>{
        return prev + cartvalue.quantity
    },0)

    const totalPrice:string = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }
    ).format(state.cart.reduce((prev,cartvalue)=>{
        return prev + cartvalue.price * cartvalue.quantity
    },0))

    const cart = state.cart.sort((a,b)=>{
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return {state,dispatch,REDUCER_ACTION,totalItems,totalPrice,cart}

}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initialCartContextState :UseCartContextType = {
    state: initialCartState,
    dispatch: () => {},
    REDUCER_ACTION: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: "$0.00",
    cart: []
    
}

const cartContext = createContext<UseCartContextType>(initialCartContextState)
type ChildrenType = {children?:ReactElement|ReactElement[]}

export const CartProvider = ({children}:ChildrenType):ReactElement => {
    return (
        <cartContext.Provider value={useCartContext(initialCartState)}>
            {children}
        </cartContext.Provider>
    )
}
export default cartContext
