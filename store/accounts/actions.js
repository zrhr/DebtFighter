import * as types from './constants';

export const enterAccount=account=>({
    type: types.ENTER_ACCOUNT,
    account
})