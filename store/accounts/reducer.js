import * as types from './constants'

const initialState ={
    accounts:[
        {id: 1 ,name: "Car Payment", months: 12, balance:15000, minimumPayment: 384, apr: 8, interestPaid: 2, calcPayment:5},
        {id:2 ,name: "BofA", months: 12, balance:6400, minimumPayment: 150, apr: 11, interestPaid: 2, calcPayment:5},
        {id:3 ,name: "BofA", months: 12, balance:6800, minimumPayment: 250, apr: 21, interestPaid: 2, calcPayment:5}
        ],
    debtPayment: "0",
    avalanche:{"totalIntrst":0, "totalPayment": 0, "totalTerm":0}
    ,snowball:{"totalIntrst":0, "totalPayment": 0, "totalTerm":0}    
}

export default (state = initialState, action)=>{
    switch(action.type){
        case types.ENTER_ACCOUNT:
            
            return({ ...action.account}
            )
            case types.SUBMIT_PAYMENT:console.log({...state, debtPayment:action.payment});
                return({ ...state,
                    "debtPayment": action.payment
          
            })
            default:
                return state
    
        }
}