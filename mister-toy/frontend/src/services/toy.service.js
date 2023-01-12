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

async function query(filterBy, sortBy) {
    try {
        let toys = await httpService.get(BASE_URL)
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            toys = toys.filter(toy => regex.test(toy.name))
        }

        if (filterBy.labels[0]) {
            toys = toys.filter(toy => filterBy.labels.every(i => toy.labels.includes(i)))
        }

        if (filterBy.inStock) {
            toys = toys.filter(toy => toy.inStock)
        }

        if (sortBy.sortBy) {
            toys.sort((t1, t2) => (t1[sortBy.sortBy] - t2[sortBy.sortBy]) * sortBy.desc)
        }
        return toys
        
    } catch (err) {
        console.error('err in query')
        throw new Error(err)
    }
}

function queryOLD(filterBy, sortBy) {
    return httpService.get(BASE_URL)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (filterBy.labels[0]) {
                toys = toys.filter(toy => filterBy.labels.every(i => toy.labels.includes(i)))
            }

            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock)
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
        inStock: true
    }
}

function getEmptyFilter() {
    return {
        name: '',
        inStock: undefined,
        labels: []
    }
}

function getEmptySort() {
    return {
        sortBy: '',
        desc: 1
    }
}