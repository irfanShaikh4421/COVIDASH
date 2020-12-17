const admin = require("firebase-admin");
const fs = require('fs')
const serviceAccount = require("./firebase.json");
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fbauth-example.firebaseio.com"
});

const createUser = ( async (req, res, next) => {
    const id = uuid()
    const claims = {	
        isAdmin: false
    }
    
    return await admin.auth().createCustomToken(uuid, claims)

} )

const uploadImage = (uid, file, transformed) => {
    return new Promise( async (resolve, reject) => {

        try{
            const db = admin.firestore()
            const storage = admin.storage()
            const localPath = './imgs/'+file.originalname
            fs.writeFileSync(localPath, transformed, 'binary')
            let a = await storage.bucket('fbauth-example.appspot.com').upload(path.join(__basedir, 'imgs', file.originalname), { public: true })
            fs.unlinkSync(localPath)
            resolve(a[0].metadata.mediaLink)

        }
        catch(e){
            reject(e)
        }        
    } )    
}

const getUserId = async (token) => {
	try{
		const decode = await admin.auth().verifyIdToken(token)
		return decode.uid
	}
	catch(e){
        console.log(e)
		return null
	}
	
}

const authenticate =  async (req, res, next) => {
    if (req.headers.authtoken)
    {
        
        try{
            let r = await admin.auth().verifyIdToken(req.headers.authtoken)
            console.log(r)
            if(r)
                next()
        }
        catch(e)
        {   
            console.log(e)
            res.status(403).json({ message : 'Not authenticated' })
        }        
    }
    else 
        res.status(403).json({ message : 'Not authenticated' })
}



module.exports = {
    admin,
    authenticate,
    getUserId,
    uploadImage
}