module.exports = app => {
    app.locals.title = 'PlantsApp',
    app.locals.map = process.env.key
}
