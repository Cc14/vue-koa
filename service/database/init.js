const mongoose = require('mongoose')
const { resolve } = require('path')
const glob = require('glob')
exports.initSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
    mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

}