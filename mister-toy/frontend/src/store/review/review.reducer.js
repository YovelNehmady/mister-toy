export const SET_REVIEWS = 'SET_REVIEWS'

// ObjectId(filterBy.byUserId)!!!

const initialState = {
    reviews: []
}

export function reviewReducer(state = initialState, action) {
    let reviews

    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, reviews: action.reviews }

        // case ADD_REVIEW:
        //     return { ...state, reviews: action.reviews }

        default:
            return state
    }
}


