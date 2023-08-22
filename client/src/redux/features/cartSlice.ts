import { createSlice, current } from "@reduxjs/toolkit";

interface CartState {
    cart: Array<any>
    loading:boolean
    tabValue: string
}

const initialState:CartState = {
    cart:[],
    loading:false,
    tabValue: ""
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state,action) => {
            const index = state.cart.findIndex(item => item.name === action.payload.name && item.id === action.payload.id && item.size === action.payload.size)
            if(index === -1){
                state.cart.push(action.payload)
            }else{
                const newArr = state.cart
                const singleItem = newArr[index]
                //console.log(current(newArr[index]))
                if(singleItem){
                    singleItem.count += 1
                    console.log(current(singleItem))
                }
            }
        },
        updateShoeSize: (state,action) => {
            //console.log(action.payload)
            const index = state.cart.findIndex(item => item.name === action.payload.name && item.id === action.payload.id && item.size === action.payload.size)
            const updatedItem = state.cart[index]
            if(updatedItem){
                console.log("updated shoe size")
                updatedItem.size = action.payload.newSize
                
            }
        },
        updateShoeCount: (state,action) => {
            const index = state.cart.findIndex(item => item.name === action.payload.name && item.id === action.payload.id && item.size === action.payload.size)
            const updatedItem = state.cart[index]
            if(updatedItem){
                console.log("updated item count")
                //console.log(action.payload.newCount)
                updatedItem.count = action.payload.newCount
            }
        },
        deleteFromCart: (state,action) => {
            state.loading = true
            state.cart = state.cart.filter(item => item.uuid !== action.payload.uuid)
            state.loading = false
            //console.log(JSON.parse(JSON.stringify()))
            //console.log(JSON.parse(JSON.stringify(newArr)))
            //const deleteItem = state.cart[index]
            //state.cart = state.cart.filter(item => item !== deleteItem)
            
        },
        setTabValue: (state,action) => {
            state.tabValue = action.payload
        },
        setClearCart: (state) => {
            state.cart = []
        }
    }
})

export default cartSlice.reducer
export const {addToCart,updateShoeSize,updateShoeCount,deleteFromCart,setTabValue,setClearCart} = cartSlice.actions