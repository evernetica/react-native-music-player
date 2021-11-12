const initialState = {
    items: []
}

export const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AUDIO_ITEM':
            return { ...state, items: [action.payload, ...state.items] }
        case 'ADD_AUDIO_LIST':
            return { ...state, items: [...action.payload, ...state.items] }
        case 'FETCH_ADIOS': {
            const items = Array.from(new Set([...state.items, ...action.payload]))
            return { ...state, items }
        }
        case 'REMOVE_AUDIO': {
            const items = state.items.filter(el => el.id !== action.payload)
            return { ...state, items }
        }
        case 'CLEAR_AUDIO_STORE': {
            return { ...state, items: [] }
        }
        default:
            return state
    }
}