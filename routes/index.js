module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/plantas', require('./plants.routes.js'))
    app.use('/tiendas', require('./stores.routes.js'))
}