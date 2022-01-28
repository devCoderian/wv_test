export const changeAction = (lang) => ({
    type: 'CHANGE_ACTION',
    lang
})

export const saveAmount = (amount) => ({
    type: 'SAVE_ACTION',
    amount  
})

export const sendInfo = (sendInfo) => ({
    type: 'SEND_INFO',
    sendInfo
})
export const sendAddress = (send_address) => ({
    type: 'SEND_ADDRESS',
    send_address
})

export const removeInfo = (sendInfo) => ({
    type: 'REMOVE_INFO',
    sendInfo
})

export const removeAddress = (send_address) => ({
    type: 'REMOVE_ADDRESS',
    send_address
})