import { createStore } from 'redux'
import {rootReducer} from '../../src/store/rootReducer'

export const makeStore = () => {
    const store = createStore(rootReducer)
    return store
}