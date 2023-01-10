import { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toyService } from "../services/toy.service"
import { SET_FILTER, SET_SORT } from "../store/app-reducer"

export function ToyFilter() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(toyService.getEmptyFilter())
    const [sort, setSort] = useState(toyService.getEmptySort())
    const elDescRef = useRef(null)

    function handleChange({ target }) {
        const { name, value } = target
        setFilter((prevFilter) => { return { ...prevFilter, [name]: value } })
    }

    function handleChangeSort({ target }) {
        let { name, value, type } = target
        if (type === 'checkbox') value = elDescRef.current.checked ? 1 : -1
        setSort((prevFilter) => { return { ...prevFilter, [name]: value } })
    }

    useEffect(() => {
        dispatch({ type: SET_FILTER, filterBy: filter })
    }, [filter])

    useEffect(() => {
        dispatch({ type: SET_SORT, sortBy: sort })
    }, [sort])

    return <section className="toy-filter">
        <input type="text"
            name="name"
            id="name"
            placeholder="Search todo..."
            onChange={handleChange}
            value={filter.name} />

        <div className="sort-container">

            <h6>Sort By:</h6>
            <select className="sortBy" name="sortBy" id="sortBy" value={sort.sortBy} onChange={handleChangeSort} >
                <option value="">Select Sorting</option>
                <option value="createdAt">By Date</option>
                <option value="price">By Price</option>
            </select>

            <label>
                Descending
                <input ref={elDescRef} className="desc" name="desc" id="desc" value={sort.desc} type="checkbox" onChange={handleChangeSort} />
            </label>

        </div>
    </section>
}