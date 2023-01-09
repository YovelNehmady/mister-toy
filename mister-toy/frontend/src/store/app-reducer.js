import { toyService } from "../services/toy.service"

export const SET_FILTER = 'SET_FILTER'


const initialState = {
    filterBy: toyService.getEmptyFilter(), 
}


export function appReducer(state = initialState, action) {


    switch (action.type) {
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }


        default:
            return state
    }
}


