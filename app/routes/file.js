/**
 * API enpoint for Files
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const Koa = require('koa');
const route = require('koa-router')();
const multer = require('@koa/multer');
const path = require('path');
const { uploadFile } = require('./utils/upload');
const { isAuthorized } = require('./utils/login');


// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const app = new Koa();

//Upload File Storage Path and File Naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join((__dirname).replace('/routes', ''), '/files'));
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})
//File upload restrictions
const limits = {
  fields: 10,//Number of non-file fields
  fileSize: 500 * 1024,//File Size Unit b
  files: 1//Number of documents
}
const upload = multer({ storage, limits })

route.post('/upload', upload.single('file'), uploadFile);

app.use(route.routes());

module.exports = app; 