import * as types from './constants'

const initialState ={
    accounts:[
        {id: 1 ,name: "Amex", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5},
        {id:2 ,name: "Visa", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5},
        {id:3 ,name: "MC", months: 12, balance:100, minimumPayment: 10, apr: .4, interestPaid: 2, calcPayment:5}],
    debtPayment: "200"
}

export default (state = initialState, action)=>{
    switch(action.type){
        case types.ENTER_ACCOUNT:
            console.log(action.account)
            return({
                ...state,
                accounts: [...state.accounts, {...action.account, id:4 , months: 12, interestPaid: 2, calcPayment:5  }]
            })
            case types.SUBMIT_PAYMENT:
                return({
                    ...state,
                    debtPayment: action.account
                })
            default:
                return state
    
        }
}