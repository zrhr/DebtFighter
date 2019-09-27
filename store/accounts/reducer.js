import * as types from './constants'

const initialState ={
    accounts:[{name: "Amex", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5},{name: "Visa", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5}, {name: "MC", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5}],
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