import { combineReducers } from 'redux';

import memo from './memoReducer'
import label from './labelReducer'

const rootReducer = combineReducers({
    memo,
    label
});

export default rootReducer;