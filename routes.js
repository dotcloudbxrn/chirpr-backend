module.exports = (app) => {
  app.get('/cool', (req, res) => {
    res.send('COOOOOOOOOOOOL')
  })
}