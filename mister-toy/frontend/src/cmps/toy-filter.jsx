import { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { MultipleSelectChip } from "../pages/multiple-select-chip"
import { toyService } from "../services/toy.service"
import { SET_FILTER, SET_SORT } from "../store/app-reducer"

export function ToyFilter() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(toyService.getEmptyFilter())
    const [sort, setSort] = useState(toyService.getEmptySort())
    const [labels, setLabels] = useState([])
    const elDescRef = useRef(null)
    const elInStockRef = useRef(null)

    function handleChange({ target }) {
        let { name, value } = target
        // if (type === 'checkbox' && name === 'inStock') value = elInStockRef.current.checked ? true : false
        if ( name === 'inStock') value = elInStockRef.current.checked ? true : false
        setFilter((prevFilter) => { return { ...prevFilter, [name]: value, labels } })
    }

    function handleChangeSort({ target }) {
        let { name, value, type } = target
        if (type === 'checkbox' && name === 'desc') value = elDescRef.current.checked ? 1 : -1
        setSort((prevFilter) => { return { ...prevFilter, [name]: value } })
    }

    useEffect(() => {
        dispatch({ type: SET_FILTER, filterBy: filter })
    }, [filter])

    useEffect(() => {
        setFilter((prevFilter) => ({ ...prevFilter, labels }))
    }, [labels])

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

        <label>
            in stock
            <input ref={elInStockRef} className="inStock" name="inStock" id="inStock" value={filter.inStock} type="checkbox" onChange={handleChange} />
        </label>

        <MultipleSelectChip personName={labels} setPersonName={setLabels} />

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