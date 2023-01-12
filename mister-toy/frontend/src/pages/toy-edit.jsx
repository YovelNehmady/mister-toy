import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MultipleSelectChip } from "../cmps/multiple-select-chip"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.action"

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [labels, setLabels] = useState([])
    const elInStockRef = useRef(null)
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try {
            setToyToEdit(toy)
            setLabels(toy.labels)
        } catch (err) {
            console.error(err)
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const newToy = { ...toyToEdit, labels }
        saveToy(newToy)
        navigate('/toy')
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        if (type === 'checkbox') value = elInStockRef.current.checked ? true : false
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    const { name, price, inStock } = toyToEdit
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

            <label>
                in stock
                <input ref={elInStockRef} className="inStock" name="inStock" id="inStock" value={inStock} type="checkbox" onChange={handleChange} />
            </label>

            <MultipleSelectChip personName={labels} setPersonName={setLabels} />

            <button>{toyId ? 'Etid' : 'Add'}</button>

        </form>

        <Link to={'/toy'}><button>Back</button></Link>

    </section>
}