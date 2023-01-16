import { reviewService } from '../../services/review.service.js'
import { store } from '../store.js'
import { SET_REVIEWS } from './review.reducer.js'

export async function loadReviews(filterBy = { txt: '', userId: '', toyId: '' }) {
    try {
        const reviews = await reviewService.query(filterBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}
export async function addReview(review) {
    try {
        const savedReview = await reviewService.save(review)
        // store.dispatch({ ADD_REVIEW, review: savedReview })//
        return savedReview
    } catch (err) {
        console.error('Cannot save review:', err)
        throw err
    }
}