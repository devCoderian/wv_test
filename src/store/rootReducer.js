const initialState = {
    language: false , //getAsyncStorage(i18n.js 고려해보기)
    amount: '',
    send_address: '',
    sendInfo: {
        send_amount: '',
        send_fee: '', 
        send_memo: '',
    }   
}

export const rootReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ACTION':
            return {...state, language: action.lang }
        case 'SAVE_AMOUNT':
            return {...state, amount: action.amount}
        case 'SEND_INFO': 
            return {...state, sendInfo: action.sendInfo }  
        case 'SEND_ADDRESS': 
        return {...state, send_address: action.send_address}
        // case 'SEND_INFO': 
        //     return {...state, sendInfo: action.sendInfo }
    }
    return state;
}