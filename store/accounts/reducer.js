import * as types from './constants'

const initialState ={
    accounts:[{},{}],
    debtPayment: "200"
}

export default (state = initialState, action)=>{
    switch(action.type){
        case types.ENTER_ACCOUNT:
            return({
                ...state,
                debtPayment: action.account
            })
            default:
                return state
    
        }
}