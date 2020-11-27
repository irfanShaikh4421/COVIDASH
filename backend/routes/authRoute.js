const router = require('express').Router()
const { wrapErrorHandler } = require('../utilities/error')



router.get("/", wrapErrorHandler( async (req, res, next) => {
    res.json({ message: "Hello from Auth route" })
} ) )


module.exports = router