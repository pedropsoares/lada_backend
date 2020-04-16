const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const db = () => {
  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true&authSource=admin&retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

module.exports = db;