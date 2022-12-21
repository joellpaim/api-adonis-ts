import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estado from 'App/Models/Estado'

export default class EstadosController {
    public async store({ auth, request, response }: HttpContextContract) {

        await auth.authenticate()

        const body = request.body()
 
        const estado =  await Estado.create(body)
 
        response.status(201)
 
        return {
         message: "Estado criado com sucesso",
         data: estado,
        }
    }

    public async index({ auth }: HttpContextContract) {

        await auth.authenticate()

        const estados = await Estado.all()

        return {
            data: estados
        }
    }

    public async show({ auth, params }: HttpContextContract) {

        await auth.authenticate()

        const estado = await Estado.findOrFail(params.id_estado)

        return {
            data: estado,
        }
    }

    public async destroy({ auth, params }: HttpContextContract) {

        await auth.authenticate()

        const estado = await Estado.findOrFail(params.id_estado)

        await estado.delete()

        return {
            message: "Estado excluido com sucesso!",
            data: estado,
        }
    }

    public async update ({ auth, params, request }: HttpContextContract) {
        
        await auth.authenticate()

        const body = request.body()

        const estado = await Estado.findOrFail(params.id_estado)
        
        estado.nom_estado = body.nom_estado

        await estado.save()

        return {
            message: "Estado atualizado com sucesso!",
            data: estado,
        }
    }
}
