import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async store({request}: HttpContextContract) {
        const data = request.only(['username', 'password'])

        const user = await User.create(data)

        return user
    }
}
