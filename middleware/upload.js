// configuration files
const multer = require('multer');
const moment = require('moment');

// store files
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`)
    }
});
//filter files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
} 
//limit size files
const limits = {
    filesize: 1024 * 1024 * 5
}
module.exports = multer({storage, fileFilter, limits});