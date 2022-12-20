import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios')

export default class BasicAuthMiddleware {
  protected async authenticate(
    _auth: HttpContextContract['auth'],
    _guards: (keyof GuardsList)[],
    base64Credentials: string
  ) {
    const params = {
      Authorization: base64Credentials,
      Role: Env.get('ROLE'),
    }

    const url = Env.get('URL_AUTENTICACAO')
    await axios({ method: 'get', url: url, params: params })
      .then(({ data }) => {
        if (!data) {
          throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
        } else {
          return true
        }
      })
      .catch((_e) => {
        throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
      })
  }

  /**
   * Handle request
   */
  public async handle(
    { request, auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    if (
      !request.request.headers.authorization ||
      request.request.headers.authorization.toLowerCase().indexOf('basic ') === -1
    ) {
      throw new AuthenticationException('Missing Authorization Header', 'E_UNAUTHORIZED_ACCESS')
    }

    const base64Credentials = request.request.headers.authorization.split(' ')[1]

    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards, base64Credentials)
    await next()
  }
}