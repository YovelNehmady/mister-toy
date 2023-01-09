import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.action"

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
        navigate('/toy')
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    const { name, price, labels } = toyToEdit
    return <section className="toy-edit">

        <form onSubmit={onSubmit}>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter the Toy's name..."
                onChange={handleChange}
                value={name} />

            <input type="number"
                name="price"
                id="price"
                placeholder="Enter the Toy's price..."
                onChange={handleChange}
                value={price} />

            <input type="text"
                name="labels"
                id="labels"
                placeholder="Enter the Toy's labels, spred by coma..."
                onChange={handleChange}
                value={labels} />


            <button>{toyId ? 'Etid' : 'Add'}</button>
        </form>

        <Link to={'/toy'}><button>Back</button></Link>
    </section>
}