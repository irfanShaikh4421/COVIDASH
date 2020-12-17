const express = require('express');
const router = express.Router();
const data = require('../data');
const hospitalData = data.hospitalBeds;


router.get('/', async(req, res) => {
    //practically no error checking is needed, doesn't need to take in any arguments
    try{
        const response = await hospitalData.getBeds();
        res.json(response);
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