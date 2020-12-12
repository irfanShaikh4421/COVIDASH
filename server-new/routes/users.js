const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/:id', async(req, res) => {
    const userId = req.params.id;
    let user;
    try{//needs Syntax error checking for Valid ID data type
        if((typeof userId !== "string") || (userId.length !==28)) throw SyntaxError("userId must be a valid uid");
        user = await userData.getUser(userId);
        res.json(user);
    } catch (e) {
        if(e instanceof SyntaxError){//missing input param (ID or body)
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof ReferenceError){//non-existing user ID
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else{
            console.log(e);
        }
    }
});

router.post('/:id', async(req, res) => {//account creation
    const userId = req.params.id;//still needs Syntax error checking for valid ID data type
    try{
        if((typeof userId !== "string") || (userId.length !==28)) throw SyntaxError("userId must be a valid uid");
   /**Username stuff
        if(!req.body) throw SyntaxError("Needs a request body");
        if(!req.body.userName) throw SyntaxError("Request body needs a userName!");
        if(typeof req.body.userName !== "string") throw TypeError("userName must be of type string"); */
        user = await userData.createUser(userId/*, req.body.userName*/);//will return the newly created user
        res.json(user);
    }catch(e){
        if(e instanceof SyntaxError){//missing input param (ID or body)
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof ReferenceError){//preexisting user ID, can't create
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof TypeError){//invlaid req.body items
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }
    }//accounts are created with the image set to undefined, and the country code set to 0
});

router.patch('/:id', async(req, res) => {//adding either a picture or a country to a user
    const userId = req.params.id;//still needs Syntax error check for valid ID
    try{
        if((typeof userId !== "string") || (userId.length !==28)) throw SyntaxError("userId must be a valid uid");
        if(!req.body) throw SyntaxError("Needs a request body");
        let oldUser = await userData.getUser(userId);//retrieves old user account info
        let newUser = {
 //           userName: ((req.body && req.body.userName) ? req.body.userName : oldUser.userName),
            countryCode: ((req.body && req.body.countryCode) ? req.body.countryCode : oldUser.countryCode),
            image: ((req.body && req.body.image) ? req.body.image : oldUser.countryCode)
        }
        if(!userData.isUser(newUser)) throw TypeError("Missing or Invalid Request Body Input Parameter(s), Request body must be of format: \n" +
            "{"+//"\n userName: <string>"+
            "\n countryCode: <number>,\n image: <imageURL> \n}");
        console.log("In user PATCH route, need to update type error for images");
        let validUser = await userData.updateUser(userId, newUser);
        res.json(validUser);
    }catch(e){
        if(e instanceof SyntaxError){//missing input param (ID or body)
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof ReferenceError){//non-existing user ID
            console.error(e.name+ ": " + e.message);
            res.status(404).json({"ERROR": e.name + ": " + e.message});
        }else if(e instanceof TypeError){//invlaid req.body items
            console.error(e.name+ ": " + e.message);
            res.status(400).json({"ERROR": e.name + ": " + e.message});
        }
    }
});

module.exports = router;