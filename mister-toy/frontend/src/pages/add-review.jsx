import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { reviewService } from "../services/review.service"
import { addReview } from "../store/review/review.action"

export function AddReview() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [review, setReview] = useState(reviewService.getEmptyReview())

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const newReview = { ...review, toyId }
            await addReview(newReview)
            showSuccessMsg('Your review saved')
            navigate(-1)
        } catch (err) {
            console.error(err)
            showErrorMsg('Something went wrong, please try again...')
        }
    }

    function handleChange({ target }) {
        let { value } = target
        setReview((prevReview) => ({ ...prevReview, txt: value }))
    }

    return <section className="add-review">
        <form onSubmit={onSubmit}>
            <textarea type="text"
                name="txt"
                id="txt"
                placeholder="Enter your review..."
                onChange={handleChange}
                value={review.txt} />
            <button>Send</button>
        </form>
    </section>
}