module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/plants', require('./plants.routes.js'))
}