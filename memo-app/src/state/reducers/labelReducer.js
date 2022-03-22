import axios from 'axios';

import { LIST, READ, CREATE, DELETE, UPDATE, GET_LABELS } from '../actions/labelAction';
import { list, read, create, del, update, getLabels } from '../actions/labelAction';

const emptyLabel = {
    id: null,
    createdAt: null,
    updatedAt: null,
    title: null,
    memoCount: 0,
};

export function getLabelsByMemo(dispatch, id, clear) {
    if (clear) {
        dispatch(getLabels({status:'init'}));
        return;
    }
    dispatch(getLabels({status:'loading'}));
    axios.get(`/memos/${id}/labels`)
        .then( response => dispatch(getLabels({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(getLabels({status:"error", statusCode:error.status}, {})));
}

export function labelList(dispatch, clear) {
    if (clear) {
        dispatch(list({status:'init'}));
        return;
    }
    dispatch(list({status:'loading'}));
    axios.get(`/labels`)
        .then( response => dispatch(list({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(list({status:"error", statusCode:error.status}, {})));
}

export function readLabel(dispatch, id, clear) {
    if (clear) {
        dispatch(read({status:'init'}));
        return;
    }
    dispatch(read({status:'loading'}));
    axios.get(`/labels/${id}`)
        .then( response => dispatch(read({status:"complete", statusCode:response.status}, {...response.data})))
        .catch( error => dispatch(read({status:"error", statusCode:error.status}, {})));
}

export function saveLabel(dispatch, label, clear) {
    const headers = {'Content-Type': 'application/json'}

    if (typeof (label.id) === undefined || !label.id) { // create, has no id
        if (clear) {
            dispatch(create({ status: 'init' }));
            return;
        }
        dispatch(create({ status: 'loading' }));
        axios.post(`/labels`, JSON.stringify(label), { headers: headers })
            .then(response => {
                dispatch(create({ status:'complete', statusCode: response.status }, {...response.data}));
                //TODO: This action is necessary because this list can be updated first
                //      but list update occurs also on the label list page
                //      so need improvement
                labelList(dispatch);
            })
            .catch(error => dispatch(create({ status:"error", statusCode: error.status }, emptyLabel)));
    } else { // update
        if (clear) {
            dispatch(update({ status: 'init' }));
            return;
        }
        dispatch(update({ status: 'loading' }));

        axios.put(`/labels/${label.id}`, JSON.stringify(label), { headers: headers })
            .then(response => {
                dispatch(update({ status:'complete', statusCode: response.status }, {...response.data}));
                //TODO: This action is necessary because this list can be updated first
                //      but list update occurs also on the label list page
                //      so need improvement
                labelList(dispatch);
            })
            .catch(error => dispatch(update({ status:"error", statusCode: error.status }, emptyLabel)));
    }
}

export function deleteLabel(dispatch, id, clear) {
    if (clear) {
        dispatch(del({ status: 'init' }));
        return;
    }
    dispatch(del({ status: 'loading' }));

    axios.delete(`/labels/${id}`)
        .then(response => {
            dispatch(del({ status:"complete", statusCode: response.status }, {...response.data}))
            //TODO: This action is necessary because this list can be updated first
            //      but list update occurs also on the label list page
            //      so need improvement
            labelList(dispatch);
        })
        .catch(error => dispatch(del({ status:"error", statusCode: error.status }, emptyLabel)));
}


export default function labelReducer(state = { header: { status: 'init'} }, action) {
    switch (action.type) {
        case GET_LABELS:
            return { ...state, labels : action.data, header : action.header } 
        case LIST:
            return { ...state, list: action.data, header: action.header };
        case CREATE:
        case UPDATE:
        case READ:
            return { ...state, value: action.data, header: action.header };
        case DELETE:
            return { ...state, value: action.data, header: action.header };
        default:
            return state;
    }
}