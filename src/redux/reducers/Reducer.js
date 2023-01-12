const INIT_STATE = {
    carts :[]
}
export const cartreducer = (state=INIT_STATE,action)=>{
    switch(action.type){
        case "ADD_CART":
        //    const ItemIndex = state.carts.findIndex((item)=>item.id===action.payload.id);
        //    if(ItemIndex>=0){
        //     state.carts[ItemIndex].
        //    }
            return {
                ...state,
                carts: [...state.carts,action.payload]
            }

        case "RMV_CART":
            const data = state.carts.filter((ele)=>
                ele.id!== action.payload
            )
            return {
                ...state, 
                carts: data
            }
            default :
            return state
    }
}