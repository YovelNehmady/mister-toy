import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy } from "../store/toy/toy.action"

export function ToyIndex() {
    const { toys } = useSelector(state => state.toyModule)
    const { user } = useSelector(state => state.userModule)
    const { filterBy } = useSelector(state => state.appModule)
    const { sortBy } = useSelector(state => state.appModule)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    async function onRemoveToy(toyId) {
        try {
            removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.error(err)
            showErrorMsg('Something went wrong, please try again...')
        }
    }

    return <section className="toy-index">
        <ToyFilter />
        {user?.isAdmin && <Link to={'/toy/edit'}><button>Add new toy</button></Link>}
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
}