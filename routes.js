module.exports = (app) => {
  app.get('/cool', (req, res) => {
    console.log('DAMN')
    res.send({
      hi: 'cool'
    })
    res.end()
  })
}