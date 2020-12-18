const express = require('express');
const router = express.Router();
const multer = require('multer');
const im = require('imagemagick');
const fs = require('fs');
const path = require('path')

const { getUserId, authenticate, admin, uploadImage } = require('../utils/firebase')

if(process.platform == 'win32')
{
    im.convert.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/convert'
    im.identify.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/identify'
}
const mimes = [ 'image/jpg', 'image/jpeg', 'image/png' ]

const acceptedImgs = (req, file, cb) => {
    console.log(file.mimetype)
    if(mimes.includes(file.mimetype))
        cb(null, true)
    else
        cb(null, false)
}

const upload = multer({ limits: { fileSize: '5MB', files: 1  }, fileFilter: acceptedImgs })
  
const transformImage = (image) => {
    return new Promise( (resolve, reject) => {
        im.crop({ srcData: image, width: 256, height: 256, quality: 0.75}, (err, stdout) => {
            if(err)
                reject(err)
            
            resolve(stdout)
        })
    } )
}

router.post('/', authenticate, upload.single('photo'), async (req, res, next) => {
    console.log(JSON.stringify(req.body))
    
    if(req.file)
    {

        let t = await transformImage(req.file.buffer)
        let uid = await getUserId(req.headers.authtoken)
        if(uid)
        {
            let url = await uploadImage(uid,req.file, t)
            console.log(url)
            res.json({ img: url })
        }
        else
            res.status(500).json({ message: 'No token id found' })
        
    }
    else
    {
        res.status(400).json({ message: "Error : No file attached" })
    }

} )

module.exports = router;
