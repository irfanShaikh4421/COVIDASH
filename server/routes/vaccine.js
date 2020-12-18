const express = require('express');
const router = express.Router();
const data = require('../data');
const getVaccine = data.vaccine;

router.get('/', async (req, res) => {
    try{
        const response = await getVaccine();
        res.json(response);
    }catch(e){
        if(e instanceof EvalError){//something went wrong with axios or redis
            console.error(e.name+ ": " + e.message);
            res.status(500).json({"ERROR": e.name + ": " + e.message});
        }else{
            console.log(e);
            res.status(500).json({"ERROR": "bug in the code"});
        }
    }
});

module.exports = router;