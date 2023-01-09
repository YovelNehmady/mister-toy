import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { loadToys, removeToy } from "../store/toy.action"

export function ToyIndex() {
    const { toys } = useSelector(state => state.toyModule)
    const navigate = useNavigate()

    useEffect(() => {
        loadToys()
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
    }

    function onToyDetails(toyId){
        console.log(toyId)
        navigate(`/toy/${toyId}`)
    }

    return <section className="toy-index">
        <ToyFilter />

        <Link to={'/toy/edit'}><button>Add new toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} onToyDetails={onToyDetails} />
    </section>
}