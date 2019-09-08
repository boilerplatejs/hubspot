const UPDATE = '@boilerplatejs/hubspot/Contact/UPDATE';
const UPDATE_SUCCESS = '@boilerplatejs/hubspot/Contact/UPDATE_SUCCESS';
const UPDATE_FAIL = '@boilerplatejs/hubspot/Contact/UPDATE_FAIL';

const initialState = {
  error: null
};

export function update(data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/@boilerplatejs/hubspot/Contact/update', { data })
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return state;
    case UPDATE_SUCCESS:
      return {
        ...state,
        ...action.result,
        error: null,
      };
    case UPDATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
}