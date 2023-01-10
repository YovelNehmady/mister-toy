
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getEmptyFilter,
    getEmptySort
}

function query(filterBy, sortBy) {
    return httpService.get(BASE_URL)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (sortBy.sortBy) {
                toys.sort((t1, t2) => (t1[sortBy.sortBy] - t2[sortBy.sortBy]) * sortBy.desc)
            }
            return toys
        })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true
    }
}

function getEmptyFilter() {
    return {
        name: '',
        inStock: undefined,
    }
}

function getEmptySort() {
    return {
        sortBy: '',
        desc: 1
    }
}