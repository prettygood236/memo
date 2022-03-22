export const LIST = "LABEL_LIST";
export const READ = "LABEL_READ";
export const CREATE = "LABEL_CREATE";
export const UPDATE = "LABEL_UPDATE";
export const DELETE = "LABEL_DELETE";

export const GET_LABELS = "GET_LABELS_BY_MEMO";

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
export function getLabels(header, data) {
    return {
        type: GET_LABELS,
        header,
        data
    }
}
