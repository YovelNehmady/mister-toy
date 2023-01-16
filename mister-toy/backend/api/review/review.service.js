const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    query,
    add
}

async function query(filterBy) {
    try {
        const criteria = _getCriteria(filterBy)
        console.log(criteria)
        const collection = await dbService.getCollection('review')
        let reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'userId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            },

        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.toy = { _id: review.toy._id, name: review.toy.name, price: review.toy.price }
            delete review.userId
            delete review.toyId
            return review
        })
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}

async function add(review) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.insertOne(review)
        return review
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.deleteOne({ _id: ObjectId(reviewId) })
        return reviewId
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

function _getCriteria(filter) {
    const criteria = {}
    if (filter?.txt) criteria.txt = { $regex: filter.txt, $options: 'ig' }
    if (filter?.toyId) criteria.toyId = ObjectId(filter.toyId)
    if (filter?.userId) criteria.toyId = ObjectId(filter.toyId)
    return criteria
}