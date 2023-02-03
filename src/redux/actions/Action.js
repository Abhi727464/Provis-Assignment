//add to cart function
export const ADD = (item)=>{
    return {
        type: "ADD_CART",
        payload: item
    }
}

//remove from cart function
export const DLT = (id)=>{
    return {
        type: "RMV_CART",
        payload: id
    }
}

 