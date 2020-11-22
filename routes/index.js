module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/plants', require('./plants.routes.js'))
    app.use('/stores', require('./stores.routes.js'))
    app.use('/api', require('./api.routes.js'))
}