import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import App from 'App/Models/App'

export default class AppsController {
    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
 
        const app =  await App.create(body)
 
        response.status(201)
 
        return {
         message: "App criado com sucesso",
         data: app,
        }
    }

    public async index() {
        const apps = await App.all()

        return {
            data: apps
        }
    }

    public async show({params}: HttpContextContract) {
        const app = await App.findOrFail(params.id_app)

        return {
            data: app,
        }
    }

    public async destroy({params}: HttpContextContract) {
        const app = await App.findOrFail(params.id_app)

        await app.delete()

        return {
            message: "App excluido com sucesso!",
            data: app,
        }
    }

    public async update ({params, request}: HttpContextContract) {

        const body = request.body()

        const app = await App.findOrFail(params.id_app)
        
        app.username = body.username
        app.password = body.password

        await app.save()

        return {
            message: "App atualizado com sucesso!",
            data: app,
        }
    }
}
