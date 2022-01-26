const initialState = {
    language: 'ko' , //getAsyncStorage(i18n.js 고려해보기)
    amount: '',
    sendInfo: {
        address: '',
        amount: '',
        fee: '', 
        memo: '',
    }   
}

export const rootReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'changeLang':
            return {...state, language: action.lang }
        case 'saveAmount':
            return {...state, amount: action.amount}
        case 'sendInfo': 
            return {...state, sendInfo: action.sendInfo}
    }
    return state
}