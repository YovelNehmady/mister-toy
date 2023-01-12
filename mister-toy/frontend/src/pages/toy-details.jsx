import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadToy()
    }, [])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try{
            setToy(toy)
        } catch(err){
            console.error(err)
        }
    }

    if (!toy) return <h2>Loading...</h2>
    return < section className="toy-details" >
        <h2>{toy.name}</h2>
        {toy.inStock ? 'In stock' : 'Sold out'}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae architecto explicabo sequi. Animi, nisi sapiente commodi alias voluptatibus adipisci voluptatem ea minus provident consectetur consequatur. Error quo, voluptatibus magni consequatur alias velit tempore debitis distinctio excepturi minus similique commodi et cumque, porro tempora at, veniam odio obcaecati aperiam odit. Facilis possimus omnis mollitia officiis sit a, recusandae quasi minus esse modi sapiente expedita, eveniet quaerat earum, est id numquam cum vero dolorum et totam enim quae qui beatae! Molestias, laudantium nam. Sit, obcaecati rerum quidem qui, veniam, sapiente tempora aperiam amet sunt nostrum eaque ratione itaque ea voluptate natus tempore saepe cupiditate! Deserunt tempora odit non quasi cum quos odio ab dignissimos animi consectetur. Id, earum porro officia fugiat obcaecati laudantium hic, molestiae labore ipsum laboriosam nemo ipsam tenetur velit aut nesciunt. Deleniti quisquam, cupiditate, deserunt, iure dolores soluta sit ipsa sed esse dolorum aliquid alias!</p>
        <h6>{toy.price}$</h6>

        <Link to={'/toy'}><button>Back</button></Link>
    </section >
}