import * as types from './constants'

const initialState ={
    accounts:{"name":"me", "debt": 0 },
    isLoaded:false
}

export default (state = initialState, action)=>{
    switch(action.type){
        case types.ENTER_ACCOUNT:
            return({
                ...state,
                accounts: action.account
            })
            default:
                return state
    
        }
}