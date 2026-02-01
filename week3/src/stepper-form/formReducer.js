function formReducer(state, action){
    switch(action.type){
        case 'NEXT_STEP':
            return {...state, step : state.step + 1}
        case 'PREV_STEP':
            return {...state, step : state.step - 1}
        case 'UPDATE_FIELD':
            return {...state, data : {...state.data, [action.field] : action.value}}
        case 'SET_ERRORS':
            return {...state, errors : action.errors}
        case 'SUBMIT':
            break;
        default:
            return state;
    }
}

export default formReducer