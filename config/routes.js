const controllers = require('../controllers/index')
const isAuthenticated = require('../policies/isAuthenticated')
const authenticationControllerPolicy = require('../policies/authenticationControllerPolicy')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.post('/register',
    authenticationControllerPolicy.register,
    controllers.authentication.register)
  app.post('/login',
    controllers.authentication.login),
  app.post('/chirp/create',
    isAuthenticated,
    controllers.chirp.create)
  app.get('/chirps',
    controllers.chirp.index)
  app.get('/getuser/:username',
    controllers.profile.getUserInfo)
  app.post('/edituser/:username',
    controllers.profile.editUserInfo)
}