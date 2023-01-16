import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from "../store/review/review.action"

export function ReviewExplore() {
    const { reviews } = useSelector(state => state.reviewModule)

    useEffect(() => {
        loadReviews()
    }, [])


    return <section className="review-explore">
        <ul>
            {reviews.map(review => <li key={review._id}>
               {review.toy.name} <br /> "{review.txt}" <br /> By: {review.byUser.fullname}
            </li>)}
        </ul>
    </section>
}