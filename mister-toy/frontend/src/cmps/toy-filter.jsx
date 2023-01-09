import { useState } from "react"
import { useDispatch } from "react-redux"
import { toyService } from "../services/toy.service"
import { SET_FILTER } from "../store/app-reducer"

export function ToyFilter() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(toyService.getEmptyFilter())
  
    function onSubmit(ev) {
        ev.preventDefault()
        setFilter(toyService.getEmptyFilter())
    }
    
    function handleChange({ target }) {
        const { name, value, type } = target
        setFilter((prevFulter) => { return { ...prevFulter, [name]: value } })
        dispatch({ type: SET_FILTER, filterBy: filter })
    }

    return <section className="toy-filter">
         <form onSubmit={onSubmit}>
            <input type="text"
                name="name"
                id="name"
                placeholder="Search todo..."
                onChange={handleChange}
                value={filter.name} />
            <button >Search</button>
        </form>

    </section>
}