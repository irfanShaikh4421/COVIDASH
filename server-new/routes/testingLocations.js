const express = require('express');
const router = express.Router();
const data = require('../data');
const locationData = data.testing;

router.get('/:state/:hospitalId', async(req, res) => {
    //all this route's error checking is done in the data file
    try{
        const response = await locationData.getTestHospital(req.params.state, req.params.hospitalId);
        res.json(response);
    }catch(e){
        if(e instanceof SyntaxError){//invalid path param
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof RangeError){//something went wrong with axios or redis
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof EvalError){//something went wrong with axios or redis
            console.error(e.name+ ": " + e.message);
            res.status(500).json({"ERROR": e.name + ": " + e.message});
        }else{
            console.log(e);
        }
    }
});

router.get('/:state', async(req, res) => {
    //all this route's error checking is done in the data file
    try{
        const response = await locationData.getTestState(req.params.state);
        res.json(response);
    }catch(e){
        if(e instanceof SyntaxError){//invalid path params
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof EvalError){//something went wrong with axios or redis
            console.error(e.name+ ": " + e.message);
            res.status(500).json({"ERROR": e.name + ": " + e.message});
        }else{
            console.log(e);
        }
    }
});

module.exports = router;
