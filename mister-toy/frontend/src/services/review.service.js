import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    save,
    // remove,
    getEmptyReview
}

async function query(filterBy) {
    try {
        const params = `?toyId=${filterBy.toyId}&userId=${filterBy.userId}&txt=${filterBy.txt}`
        let reviews = await httpService.get(BASE_URL + params)
        return reviews

    } catch (err) {
        console.error('err in query')
        throw new Error(err)
    }
}

function save(review) {
    return httpService.post(BASE_URL, review)
}

function getEmptyReview() {
    return {
        toyId: '',
        txt: ''
    }
}

// function getEmptyFilter() {
//     return {
//         name: '',
//         inStock: undefined,
//         labels: []
//     }
// }

// function getEmptySort() {
//     return {
//         sortBy: '',
//         desc: 1
//     }
// }