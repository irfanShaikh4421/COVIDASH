const express = require('express');
const router = express.Router();
const data = require('../data');
const hospitalData = data.hospitalBeds;

router.get('/:stateName', async(req, res) => {
    try{
        const response = await hospitalData.getStateBeds(req.params.stateName);
        res.json(response);
        if(response && response.source) {
            await hospitalData.cacheStateBeds(response.source);
        }
    }catch(e){
        if(e instanceof SyntaxError){//axios or redis error
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else {
            console.log(e);
            res.status(500).json({"ERROR": "bug in the code"});
        }
    }
});

router.get('/', async(req, res) => {
    //practically no error checking is needed, doesn't need to take in any arguments
    try{
        const response = await hospitalData.getBeds();
        res.json({source: response});
    }catch(e){
        if(e instanceof EvalError){//axios or redis error
            console.error(e.name+ ": " + e.message);
            res.status(500).json({"ERROR": e.name + ": " + e.message});
        }else {
            console.log(e);
            res.status(500).json({"ERROR": "bug in the code"});
        }
    }
});

module.exports = router;