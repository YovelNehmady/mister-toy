export const SET_USER = 'SET_USER'
export const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    user: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case UPDATE_USER_SCORE:
            const user = { ...state.user, score: action.score }
            return { ...state, user }
        default:
            return state
    }
}