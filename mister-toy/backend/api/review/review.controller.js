const reviewService = require('./review.service.js')
const logger = require('../../services/logger.service')
const { ObjectId } = require('mongodb')

module.exports = {
  getReviews,
  addReview,
  removeReview
}

async function getReviews(req, res) {
  try {
    const { toyId, userId, txt } = req.query
    const filterBy = { toyId, userId, txt }
    const reviews = await reviewService.query(filterBy)
    res.json(reviews)
  } catch (err) {
    logger.error('Failed to get reviews', err)
    res.status(500).send({ err: 'Failed to get reviews' })
  }
}
async function addReview(req, res) {
  const { _id } = req.loggedinUser
  try {
    const review = req.body
    review.toyId = ObjectId(review.toyId)
    review.userId = ObjectId(_id)
    const addedReview = await reviewService.add(review)
    res.json(addedReview)
  } catch (err) {
    logger.error('Failed to add review', err)
    res.status(500).send({ err: 'Failed to add review' })
  }
}

async function removeReview(req, res) {
  try {
    const reviewId = req.params.id
    const removedId = await reviewService.remove(reviewId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove review', err)
    res.status(500).send({ err: 'Failed to remove review' })
  }
}