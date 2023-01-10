import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { loadToys, removeToy } from "../store/toy.action"

export function ToyIndex() {
    const { toys } = useSelector(state => state.toyModule)
    const { filterBy } = useSelector(state => state.appModule)
    const { sortBy } = useSelector(state => state.appModule)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
    }

    return <section className="toy-index">
        <ToyFilter />

        <Link to={'/toy/edit'}><button>Add new toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
}