import { toyService } from "../../services/toy.service"

export const SET_FILTER = 'SET_FILTER'
export const SET_SORT = 'SET_SORT'


const initialState = {
    filterBy: toyService.getEmptyFilter(), 
    sortBy: toyService.getEmptySort(), 
}


export function appReducer(state = initialState, action) {


    switch (action.type) {
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        case SET_SORT:
            return { ...state, sortBy: action.sortBy }

        default:
            return state
    }
}


