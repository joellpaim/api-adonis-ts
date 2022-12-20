import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import App from 'App/Models/App'

export default class SessionsController {
    async store({auth}: HttpContextContract) {
        //const { username, password } = request.all()
        //const app = await App.findByOrFail('username', username)
        //const app_id = app.id_app.toString()

        const token = await auth.authenticate()

        return token
    }
}
