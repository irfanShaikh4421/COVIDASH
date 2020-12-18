const express = require('express');
const router = express.Router();
const multer = require('multer');
const im = require('imagemagick');
const fs = require('fs');

if(process.platform == 'win32')
{
    im.convert.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/convert'
    im.identify.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/identify'
}
const mimes = [ 'image/jpg' ]

const acceptedImgs = (req, file, cb) => {
    if(mimes.includes(file.mimetype))
        cb(null, true)
    else
        cb(null, false)
}

const upload = multer({ limits: { fileSize: '2MB', files: 1  }, fileFilter: acceptedImgs })

const transformImage = (image) => {
    return new Promise( (resolve, reject) => {
        im.crop({ srcData: image, width: 256, height: 256, quality: 0.75, format: 'jpg'}, (err, stdout) => {
            if(err)
                reject(err)
            
            resolve(stdout)
        })
    } )
}

router.post('/', upload.single('photo'), async (req, res, next) => {
    if(req.file)
    {
        //console.log(` file -> ${req.file.originalname} `) 
        let t = await transformImage(req.file.buffer)

        fs.writeFileSync(`${req.file.originalname}`, req.file.buffer,'binary')
        fs.writeFileSync(`new-${req.file.originalname}`, t, 'binary')

        res.json('done')
        
    }
    else
    {
        res.status(400).json({ message: "Error : No file attached" })
    }

} )

module.exports = router;
