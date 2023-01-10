import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toyService } from "../services/toy.service"
import { SET_FILTER } from "../store/app-reducer"

export function ToyFilter() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(toyService.getEmptyFilter())

    function handleChange({ target }) {
        const { name, value, type } = target
        setFilter((prevFilter) => { return { ...prevFilter, [name]: value } })
    }

    useEffect(() => {
        dispatch({ type: SET_FILTER, filterBy: filter })
    }, [filter])

    return <section className="toy-filter">
        <input type="text"
            name="name"
            id="name"
            placeholder="Search todo..."
            onChange={handleChange}
            value={filter.name} />
    </section>
}