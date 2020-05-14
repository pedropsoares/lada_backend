const multer = require('multer');
const path = require('path');


module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const company = req.body.name;

      const ext = path.extname(file.originalname);
      const name = path.basename("logo"+company+ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};