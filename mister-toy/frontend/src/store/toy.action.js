import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY } from '../store/toy.reducer.js'

export function loadToys(filterBy, sortBy) {
    return toyService.query(filterBy, sortBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })

        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    console.log('toy', toy)
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}