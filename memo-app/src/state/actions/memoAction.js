export const COUNT = "MEMO_COUNT";
export const LIST = "MEMO_LIST";
export const READ = "MEMO_READ";
export const CREATE = "MEMO_CREATE";
export const UPDATE = "MEMO_UPDATE";
export const DELETE = "MEMO_DELETE";

export const GET_MEMOS = "GET_MEMOS_BY_LABEL"
export const ADD_MEMOS = "ADD_MEMOS_TO_LABEL"
export const DEL_MEMOS = "DEL_MEMOS_FROM_LABEL"

export function count(header, data) {
    return {
        type: COUNT,
        header,
        data
    }
}

export function list(header, data) {
    return {
        type: LIST,
        header,
        data
    }
}

export function read(header, data) {
    return {
        type: READ,
        header,
        data
    }
}

export function create(header, data) {
    return {
        type: CREATE,
        header,
        data
    }
}
export function update(header, data) {
    return {
        type: UPDATE,
        header,
        data
    }
}
export function del(header, data) {
    return {
        type: DELETE,
        header,
        data
    }
}

export function getMemos(header, data) {
    return {
        type: ADD_MEMOS,
        header,
        data
    }
}
export function addMemos(header, data) {
    return {
        type: ADD_MEMOS,
        header,
        data
    }
}
export function delMemos(header, data) {
    return {
        type: DEL_MEMOS,
        header,
        data
    }
}
