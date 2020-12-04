const admin = require("firebase-admin");
const { wrapErrorHandler, Unauthorized } = require("../utilities/error");
const { v4 : uuid } = require('uuid')

const serviceAccount = require("./covidash-49df3-firebase-adminsdk-pv7mr-340946d30d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covidash-49df3.firebaseio.com"
});

const createUser = wrapErrorHandler( async (req, res, next) => {
    const id = uuid()
    const claims = {
        isAdmin: false
    }
    
    return await admin.auth().createCustomToken(uuid, claims)

} )

const authenticate = wrapErrorHandler( async (req, res, next) => {
    if (req.headers.authtoken)
    {
        
        try{
            let r = await admin.auth().verifyIdToken(req.headers.authtoken)
            if(r)
                next()
        }
        catch(e)
        {
            throw new Unauthorized()
        }        
    }
    else 
        throw new Unauthorized()
} )



module.exports = {
    admin,
    authenticate
}