const express = require('express');
const router = express.Router();
const data = require('../data');
const travelData = data.regulations;

router.get('/:iso', async(req, res) => {
    //error checking done in data file
    try {
        const response = await travelData.getRegulations(req.params.iso);
        res.json(response);
    }catch (e) {
        if(e instanceof SyntaxError){//invalid path param
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof ReferenceError){//invalid path param
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof EvalError){//axios/redis error
            console.error(e.name+ ": " + e.message);
            res.status(500).json({"ERROR": e.name + ": " + e.message});
        }else{
            console.log(e);
        }
    }
});

module.exports = router;