import axios from 'axios';
import { COUNT, LIST, READ, CREATE, DELETE, UPDATE, GET_MEMOS, ADD_MEMOS, DEL_MEMOS } from '../actions/memoAction';
import { count, list, read, create, del, update, getMemos, addMemos, delMemos } from '../actions/memoAction';

const emptyMemo = {
    id: null,
    createdAt: null,
    updatedAt: null,
    title: null,
    memoCount: 0,
};

export function getMemosByLabel(dispatch, id, clear) {
    if (clear) {
        dispatch(list({status:'init'}));
        return;
    }
    dispatch(list({status:'loading'}));

    if (id) {
        axios.get(`/labels/${id}/memos`)
            .then( response => dispatch(list({status:"complete", statusCode:response.status}, {...response.data})))
            .catch( error => dispatch(list({status:"error", statusCode:error.status}, {})));
    } else {
        axios.get(`/memos`)
            .then( response => dispatch(list({status:"complete", statusCode:response.status}, {...response.data})))
            .catch( error => dispatch(list({status:"error", statusCode:error.status}, {})));
    }
}

export function addMemosToLabel(dispatch, labelId, memoIds, clear) {
    if (clear) {
        dispatch(addMemos({status:'init'}));
        return;
    }
    dispatch(addMemos({status:'loading'}));

    const headers = {'Content-Type': 'application/json'}
    axios.post(`/labels/${labelId}/memos`, JSON.stringify({ "memoIds": memoIds }), { headers : headers })
        .then( response => dispatch(addMemos({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(addMemos({status:"error", statusCode:error.status}, {})));
}
export function delMemosFromLabel(dispatch, labelId, memoIds, clear) {
    if (clear) {
        dispatch(delMemos({status:'init'}));
        return;
    }
    dispatch(delMemos({status:'loading'}));
    axios.post(`/labels/${labelId}/memos/delete`, JSON.stringify({ "memoIds": memoIds }))
        .then( response => dispatch(delMemos({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(delMemos({status:"error", statusCode:error.status}, {})));
}

export function memoList(dispatch, clear) {
    if (clear) {
        dispatch(list({status:'init'}));
        return;
    }
    dispatch(list({status:'loading'}));
    axios.get(`/memos`)
        .then( response => dispatch(list({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(list({status:"error", statusCode:error.status}, {})));
}
export function memoCount(dispatch, clear) {
    if (clear) {
        dispatch(count({status:'init'}));
        return;
    }
    dispatch(count({status:'loading'}));
    axios.get(`/memos?countOnly=true`)
        .then( response => dispatch(count({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(count({status:"error", statusCode:error.status}, {})));
}

export function readMemo(dispatch, id, clear) {
    if (clear) {
        dispatch(read({status:'init'}));
        return;
    }
    dispatch(read({status:'loading'}));
    axios.get(`/memos/${id}`)
        .then( response => dispatch(read({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(read({status:"error", statusCode:error.status}, {})));
}

export function saveMemo(dispatch, memo, clear) {
    const headers = {'Content-Type': 'application/json'}

    if (typeof (memo.id) === undefined || !memo.id) { // create, has no id
        if (clear) {
            dispatch(create({ status: 'init' }));
            return;
        }
        dispatch(create({ status: 'loading' }));

        axios.post(`/memos`, JSON.stringify(memo), { headers : headers })
            .then(response => dispatch(create({ status:'complete', statusCode: response.status }, {...response.data})))
            .catch(error => dispatch(create({ status:"error", statusCode: error.status }, emptyMemo)));
    } else { // update

        if (clear) {
            dispatch(update({ status: 'init' }));
            return;
        }
        dispatch(update({ status: 'loading' }));
        axios.put(`/memos/${memo.id}`, JSON.stringify(memo), { headers : headers })
            .then(response => dispatch(update({ status:'complete', statusCode: response.status }, {...response.data})))
            .catch(error => dispatch(update({ status:"error", statusCode: error.status }, emptyMemo)));
    }
}

export function deleteMemo(dispatch, id, clear) {
    if (clear) {
        dispatch(del({ status: 'init' }));
        return;
    }
    dispatch(del({ status: 'loading' }));

    axios.delete(`/memos/${id}`)
        .then(response => dispatch(del({ status:"complete", statusCode: response.status }, {...response.data})))
        .catch(error => dispatch(del({ status:"error", statusCode: error.status }, emptyMemo)));
}


export default function labelReducer(state = { header: { status: 'init'} }, action) {
    switch (action.type) {
        case COUNT:
            return { ...state, count: action.data, header: action.header };
        case LIST:
            return { ...state, list: action.data, header: action.header };
        case CREATE:
        case UPDATE:
        case READ:
            return { ...state, value: action.data, header: action.header };
        case DELETE:
            return { ...state, value: action.data, header: action.header };
        case GET_MEMOS:
            return { ...state, memos: action.data, header: action.header };
        case DEL_MEMOS:
        case ADD_MEMOS:
            return { ...state, header: action.header };
        default:
            return state;
    }
}