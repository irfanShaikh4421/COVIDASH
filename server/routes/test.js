const router = require('express').Router()
const { wrapErrorHandler, BadRequest } = require('../utilities/error')



router.get("/", wrapErrorHandler( async (req, res, next) => {
    res.json({ message: "Hello" })
} ) )

router.get("/error", wrapErrorHandler( async (req,res,next) => {
    
    throw new BadRequest("Error triggered")
    res.json({ success: true })
} ))

module.exports = router