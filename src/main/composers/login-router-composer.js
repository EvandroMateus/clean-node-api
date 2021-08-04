const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encryter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

module.exports = class LoginRouterComposer {
  static compose () {
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const encryter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encryter,
      tokenGenerator
    })
    return new LoginRouter({
      authUseCase,
      emailValidator
    })
  }
}
