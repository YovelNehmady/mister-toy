
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getEmptyFilter
}

function query(filterBy) {
    if(!filterBy.name || !filterBy) return storageService.query(STORAGE_KEY)
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        return storageService.query(STORAGE_KEY)
            .then(toys => toys.filter(toy => regex.test(toy.name)))
    }
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
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
        sortBy: null,
        desc: 1

    }
}

function _createToy(name) {
    return {
        name,
        price: utilService.getRandomIntInclusive(),
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: 1631031801011,
        inStock: true
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('puki'))
        toys.push(_createToy('muki'))
        toys.push(_createToy('tuki'))
        toys.push(_createToy('kuki'))
        toys.push(_createToy('luki'))
        toys.push(_createToy('fuki'))
        toys.forEach(toy => toy._id = utilService.makeId())
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
    return toys
}

