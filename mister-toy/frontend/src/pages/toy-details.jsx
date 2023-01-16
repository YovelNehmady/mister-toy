import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { loadReviews } from "../store/review/review.action"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const { user } = useSelector(state => state.userModule)
    const { reviews } = useSelector(state => state.reviewModule)

    useEffect(() => {
        loadToy()
        loadReviews({ txt: '', userId: '', toyId: toyId })
    }, [])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try {
            setToy(toy)
        } catch (err) {
            console.error(err)
        }
    }
    console.log('reviews', reviews)
    if (!toy) return <h2>Loading...</h2>
    return < section className="toy-details" >
        <h2>{toy.name}</h2>
        {toy.inStock ? 'In stock' : 'Sold out'}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae architecto explicabo sequi. Animi, nisi sapiente commodi alias voluptatibus adipisci voluptatem ea minus provident consectetur consequatur. Error quo, voluptatibus magni consequatur alias velit tempore debitis distinctio excepturi minus similique commodi et cumque, porro tempora at, veniam odio obcaecati aperiam odit. Facilis possimus omnis mollitia officiis sit a, recusandae quasi minus esse modi sapiente expedita, eveniet quaerat earum, est id numquam cum vero dolorum et totam enim quae qui beatae! Molestias, laudantium nam. Sit, obcaecati rerum quidem qui, veniam, sapiente tempora aperiam amet sunt nostrum eaque ratione itaque ea voluptate natus tempore saepe cupiditate! Deserunt tempora odit non quasi cum quos odio ab dignissimos animi consectetur. Id, earum porro officia fugiat obcaecati laudantium hic, molestiae labore ipsum laboriosam nemo ipsam tenetur velit aut nesciunt. Deleniti quisquam, cupiditate, deserunt, iure dolores soluta sit ipsa sed esse dolorum aliquid alias!</p>
        <h6>{toy.price}$</h6>
        <h3>Reviews</h3>
        <ul>
            {reviews.map(review => <li key={review._id}>
               "{review.txt}" <br /> By: {review.byUser.fullname}
            </li>)}
        </ul>

        {user && <Link to={`/review/${toyId}`}><button>Add review</button></Link>}
        <Link to={'/toy'}><button>Back</button></Link>
    </section >
}